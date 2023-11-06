import { MemberPartialSchema } from '@/server/prisma/zod-generated/modelSchema/MemberSchema';
import { TRPCError } from '@trpc/server';
import { MemberForm, MemberFormSchema } from '@/utils/zodschemas';
import { Prisma } from '@prisma/client';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import {
  MemberFindManyArgsSchema,
  MemberWhereUniqueInputSchema,
} from '../prisma/zod-generated';
import {
  checkForExistingMember,
  checkExistingHorses,
  horseNames,
} from './utils';
import { MyPrismaClient } from '../prisma';

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

  // NOTE: Endpoint will only report an existing member if they are a lifetime member
  exists: procedure.input(MemberFormSchema).mutation(async ({ input, ctx }) => {
    const fullName =
      input.member.businessName ??
      `${input.member.firstName} ${input.member.lastName}`;

    console.info(`Checking if ${fullName} is a lifetime member.`);

    if (await checkForExistingMember(fullName, ctx.prisma, 'Life')) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: `${fullName} is already a member`,
      });
    }

    if (input.horses) {
      console.log(`Checking for horses... ${horseNames(input.horses)}`);
      const existingHorses = await checkExistingHorses(
        input.horses,
        ctx.prisma
      );

      if (existingHorses) {
        const message = `${existingHorses}
        ${existingHorses.length > 1 ? 'have' : 'has'} already been registered.`;

        throw new TRPCError({
          code: 'CONFLICT',
          message: message,
        });
      }
    }
  }),

  create: procedure
    .input(MemberFormSchema)
    .mutation(async ({ input: { member, horses }, ctx }) => {
      console.info(`Member: ${JSON.stringify(member)}`);
      console.info(
        `Horses: ${JSON.stringify(horses)}` ?? 'Did not register horses'
      );
      await createMember({ member, horses }, ctx.prisma);
    }),

  /* TODO:
   * Step 1. Look for an existing user(Only do this step if they are signing up with
   * an annual membership)
   *
   * Step 1.5. Check if the annual member is signing up for the current year or the
   * up-coming year
   *
   * Step 2. Update/create membership with new membership date and membership end date, user
   * has the option of selecting current year and next year as options
   *
   */
  publicUpdate: procedure
    .input(MemberFormSchema)
    .mutation(async ({ input: { member, horses }, ctx }) => {
      const fullName =
        member.businessName ??
        `${member.firstName.trim()} ${member.lastName.trim()}`;

      const exisitingMember = ctx.prisma.member.findFirst({
        where: {
          fullName,
        },
      });

      if ((await exisitingMember) === null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Attemping to update user that does not exist.',
        });
      }

      await updateAnnualMember({ member, horses }, ctx.prisma);
    }),

  manualAdd: dashboardProcedure
    .input(MemberFormSchema.shape.member)
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

async function createMember(
  { member, horses }: MemberForm,
  prisma: MyPrismaClient
) {
  try {
    // TODO: Move this into a seperate 'addNewMember' Function
    return prisma.member.create({
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

async function updateAnnualMember(
  { member, horses }: MemberForm,
  prisma: MyPrismaClient
) {
  const fullName =
    member.businessName ??
    `${member.firstName.trim()} ${member.lastName.trim()}`;
  try {
    // TODO: Create Dynamic date, should be November 30th 20XX(one year from current year)
    return prisma.member.update({
      where: {
        fullName,
      },
      data: {
        // TODO: Do we want to update all of their fields or only the new dates? discuss
        ...member,
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
