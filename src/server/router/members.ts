import { MemberPartialSchema } from '@/server/prisma/zod-generated/modelSchema/MemberSchema';
import { TRPCError } from '@trpc/server';
import { MemberForm, MemberFormSchema } from '@/utils/zodschemas';
import { Prisma } from '@prisma/client';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import {
  MemberFindManyArgsSchema,
  MemberWhereUniqueInputSchema,
} from '../prisma/zod-generated';
import { horseNames } from './utils';
import { checkExistingHorses } from '../prisma/queries/horses';
import { MyPrismaClient } from '../prisma';
import { findMany } from '../prisma/queries/shared';
import { findUniqueOrThrow, findUnique } from '../prisma/queries/members';

export const members = router({
  all: procedure
    .input(MemberFindManyArgsSchema.optional())
    .query(async ({ input, ctx }) => {
      return findMany('Member', input, ctx.prisma);
    }),

  get: procedure
    .input(MemberWhereUniqueInputSchema)
    .query(async ({ input, ctx }) => {
      try {
        return findUniqueOrThrow(input, ctx.prisma);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `${input.fullName} not found.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: `Something went wrong fetching ${input.fullName}`,
              cause: error,
            });
          }
        } else {
          throw error;
        }
      }
    }),

  exists: procedure.input(MemberFormSchema).mutation(async ({ input, ctx }) => {
    const fullName =
      input.memberInput.businessName ??
      `${input.memberInput.firstName} ${input.memberInput.lastName}`;

    console.info(`Checking if ${fullName} is a member.`);

    const existingMember = await findUnique({ fullName }, ctx.prisma);
    if (existingMember) {
      if (existingMember.memberStatus === 'Life') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `${fullName} is already a lifetime member`,
        });
      }

      if (existingMember.membershipEnd && input.memberInput.membershipEnd) {
        if (
          existingMember.membershipEnd.getFullYear() >=
          input.memberInput.membershipEnd.getFullYear()
        ) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `You are already signed up for the selected year.`,
          });
        }
      }
    }

    if (input.horses) {
      console.log(`Checking for horses... ${horseNames(input.horses)}`);
      const existingHorses = await checkExistingHorses(
        input.horses,
        ctx.prisma,
      );

      if (existingHorses) {
        const signedUp: typeof existingHorses | undefined = [];
        existingHorses.forEach(existingHorse => {
          if (existingHorse.regType === 'Life') {
            signedUp.push(existingHorse);
          } else {
            // NOTE: This is here just incase registrationEnd is null/empty
            if (existingHorse.registrationEnd) {
              const horseInput = input.horses?.find(
                h => h.horseRN === existingHorse.horseRN,
              );
              if (horseInput && horseInput.registrationEnd) {
                if (
                  existingHorse.registrationEnd.getFullYear() >=
                  horseInput.registrationEnd.getFullYear()
                ) {
                  signedUp.push(existingHorse);
                }
              }
            }
          }
        });

        if (signedUp.length > 0) {
          const message = `${horseNames(signedUp)} ${
            signedUp.length > 1 ? 'have' : 'has'
          } already been registered.`;

          throw new TRPCError({
            code: 'CONFLICT',
            message: message,
          });
        }
      }
    }
  }),

  add: procedure
    .input(MemberFormSchema)
    .mutation(async ({ input: { memberInput, horses }, ctx }) => {
      console.info(`Member: ${JSON.stringify(memberInput)}`);
      console.info(
        horses
          ? `Horses: ${JSON.stringify(horses)}`
          : 'Did not register horses',
      );

      const fullName =
        memberInput.businessName ??
        `${memberInput.firstName.trim()} ${memberInput.lastName.trim()}`;

      // Check if Updating a member (Able to update annual to life member)
      const existingMember = await getMember({ fullName }, ctx.prisma);

      const today = new Date();
      if (existingMember) {
        console.log('Updating membership status');
        await ctx.prisma.$transaction(async tx => {
          await tx.member.update({
            where: { fullName },
            data: { ...memberInput, membershipDate: today },
          });

          const queries = horses?.map(horse =>
            tx.horse.upsert({
              where: { horseRN: horse.horseRN },
              create: { ...horse, memberName: fullName },
              update: { ...horse, registrationDate: today },
            }),
          );

          if (queries) {
            await Promise.allSettled(queries);
          }
        });
      } else {
        await addMember({ memberInput, horses }, ctx.prisma);
      }
    }),

  manualAdd: dashboardProcedure
    .input(MemberFormSchema.shape.memberInput)
    .mutation(async ({ input, ctx }) => {
      const fullName = `${input.firstName} ${input.lastName}`;
      try {
        const member = await ctx.prisma.member.create({
          data: {
            fullName,
            ...input,
          },
        });

        return member;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Unable to add new member.',
            cause: error,
          });
        }

        throw error;
      }
    }),

  remove: dashboardProcedure
    .input(MemberWhereUniqueInputSchema)
    .mutation(async ({ input, ctx }) => {
      const { fullName } = input;

      console.info(`Removing member ${fullName}...`);

      try {
        const member = await ctx.prisma.member.findUniqueOrThrow({
          where: { fullName: fullName },
        });

        const deletedMember = await ctx.prisma.member.delete({
          where: { fullName: member.fullName },
        });

        return deletedMember;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `${fullName} not found.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: `unable to remove ${fullName}`,
              cause: error,
            });
          }
        }
      }
    }),

  dashboardUpdate: dashboardProcedure
    .input(MemberPartialSchema)
    .mutation(async ({ input: { fullName, ...data }, ctx }) => {
      console.info(
        `Updating member ${fullName}...\n${JSON.stringify(data, null, 2)}`,
      );

      try {
        return await ctx.prisma.member.update({
          where: {
            fullName,
          },
          data,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `${fullName} not found.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Something went wrong, contact us for more information.',
              cause: error,
            });
          }
        }

        throw error;
      }
    }),
});

async function addMember(
  { memberInput, horses }: MemberForm,
  prisma: MyPrismaClient,
) {
  try {
    return prisma.member.upsert({
      where: {
        fullName:
          memberInput.businessName ??
          `${memberInput.firstName.trim()} ${memberInput.lastName.trim()}`,
      },
      create: {
        fullName:
          memberInput.businessName ??
          `${memberInput.firstName.trim()} ${memberInput.lastName.trim()}`,
        Horse: {
          createMany: {
            data: horses ? horses : [],
          },
        },
        ...memberInput,
      },
      update: {
        fullName:
          memberInput.businessName ??
          `${memberInput.firstName.trim()} ${memberInput.lastName.trim()}`,
        ...memberInput,
        membershipDate: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // TODO: Check for some of the more common db/prisma errors
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong, contact us for more information.',
        cause: error,
      });
    }

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong, contact us for more information.',
      cause: error,
    });
  }
}

async function getMember(filters: Prisma.MemberWhereInput, db: MyPrismaClient) {
  return db.member.findFirst({ where: filters });
}
