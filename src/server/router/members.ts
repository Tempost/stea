import { MyPrismaClient } from '@/server/prisma';
import { MemberPartialSchema } from '@/server/prisma/zod-generated/modelSchema/MemberSchema';
import { TRPCError } from '@trpc/server';
import { MemberFormSchema } from '@/utils/zodschemas';
import { Prisma } from '@prisma/client';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import {
  MemberFindManyArgsSchema,
  MemberWhereUniqueInputSchema,
} from '../prisma/zod-generated';

export const members = router({
  all: procedure
    .input(MemberFindManyArgsSchema.optional())
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.member.findMany(input).catch(error => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch member list',
            cause: error,
          });
        } else {
          throw error;
        }
      });
    }),

  get: procedure
    .input(MemberWhereUniqueInputSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.member
        .findUniqueOrThrow({ where: input })
        .catch(error => {
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
        });
    }),

  exists: procedure.input(MemberFormSchema).mutation(async ({ input, ctx }) => {
    const fullName =
      input.member.businessName ??
      `${input.member.firstName} ${input.member.lastName}`;

    console.info(`Checking for ${fullName}...`);

    if (await checkForExistingMember(fullName, ctx.prisma)) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: `${fullName} is already a member`,
      });
    }
  }),

  add: procedure
    .input(MemberFormSchema)
    .mutation(async ({ input: { member, horses }, ctx }) => {
      console.info(`Member: ${member}`);
      console.info(
        `Horses: ${JSON.stringify(horses)}` ?? 'Did not register horses'
      );

      try {
        await ctx.prisma.member.create({
          data: {
            ...member,
            fullName:
              member.businessName ??
              `${member.firstName.trim()} ${member.lastName.trim()}`,
            Horse: {
              create: horses && [
                ...horses.map(horse => {
                  return { ...horse, horseRN: horse.horseRN.trim() };
                }),
              ],
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong, contact us for more information.',
            cause: error,
          });
        }

        throw error;
      }
    }),

  remove: procedure
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

  update: dashboardProcedure
    .input(MemberPartialSchema)
    .mutation(async ({ input: { fullName, ...data }, ctx }) => {
      console.info(
        `Updating member ${fullName}...\n${JSON.stringify(data, null, 2)}`
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

async function checkForExistingMember(fullName: string, db: MyPrismaClient) {
  return !!(await db.member.findUnique({ where: { fullName } }));
}
