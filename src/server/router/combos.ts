import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { MyPrismaClient } from '@/server/prisma';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import {
  RiderComboFindManyArgsSchema,
  RiderComboWhereUniqueInputSchema,
} from '../prisma/zod-generated';
import { Prisma } from '@prisma/client';

const defaultOpts: z.infer<typeof RiderComboFindManyArgsSchema> = {
  orderBy: [
    {
      member: {
        memberStatusType: 'asc',
      },
    },
    {
      division: 'asc',
    },
    {
      totalPoints: 'desc',
    },
  ],
  select: {
    uid: true,
    member: {
      select: {
        fullName: true,
        memberStatusType: true,
      },
    },
    horse: {
      select: {
        horseRN: true,
      },
    },
    shows: true,
    totalPoints: true,
    totalShows: true,
    division: true,
  },
};

export const riders = router({
  all: procedure
    .input(RiderComboFindManyArgsSchema.optional())
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.riderCombo.findMany(input ?? defaultOpts);
    }),

  get: procedure
    .input(RiderComboWhereUniqueInputSchema)
    .query(async ({ input, ctx }) => {
      return await fetchRiderCombo(input, ctx.prisma);
    }),

  remove: dashboardProcedure
    .input(RiderComboWhereUniqueInputSchema)
    .mutation(async ({ input, ctx }) => {
      await fetchRiderCombo(input, ctx.prisma);

      // TODO: Find out why this returns empty obj
      // return await prisma.riderCombo.delete({
      //   where: {
      //     uid: rider.uid,
      //   },
      //   select: {
      //     memberName: true,
      //     horseName: true,
      //     division: true,
      //   },
      // });
    }),
});

function fetchRiderCombo(
  input: z.infer<typeof RiderComboWhereUniqueInputSchema>,
  prisma: MyPrismaClient
) {
  try {
    return prisma.riderCombo.findUniqueOrThrow({
      where: input,
      select: defaultOpts.select,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2001') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${
            input.uid ?? input.memberName_horseName_division
          } not found.`,
          cause: error,
        });
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Something went wrong fetching ${
            input.uid ?? input.memberName_horseName_division
          }`,
          cause: error,
        });
      }
    }
  }
}
