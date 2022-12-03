import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { prisma } from '@/server/prisma';
import { dashboardProcedure, procedure, router } from '@/server/trpc';

const selectFields = {
  uid: true,
  member: true,
  horse: true,
  shows: true,
  points: true,
  multiVenue: true,
  completedHT: true,
  totalPoints: true,
  totalShows: true,
  division: true,
};

const GetRiderOpts = z
  .object({
    memberName: z.string(),
    horseName: z.string(),
    selectFields: z.object({
      uid: z.boolean(),
      member: z.boolean(),
      horse: z.boolean(),
      shows: z.boolean(),
      points: z.boolean(),
      multiVenue: z.boolean(),
      completedHT: z.boolean(),
      totalPoints: z.boolean(),
      totalShows: z.boolean(),
      division: z.boolean(),
    }),
  })
  .deepPartial()
  .optional();

export const riders = router({
  all: procedure.input(GetRiderOpts).query(async ({ input, ctx }) => {
    const riders = await ctx.prisma.riderCombo.findMany({
      where: {
        memberName: input?.memberName,
        horseName: input?.horseName,
      },
      select: input?.selectFields ?? selectFields,
    });

    return riders;
  }),

  get: procedure.input(z.object({
    memberName: z.string().optional(),
    horseName: z.string().optional(),
  })).query(async ({ input, ctx }) => {
    const riders = await ctx.prisma.riderCombo.findFirst({
      where: {
        memberName: input?.memberName,
        horseName: input?.horseName,
      },
      select: selectFields,
    });

    if (!riders) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `${input.memberName} riding ${input.horseName} not found.`,
      });
    }

    return riders;
  }),

  remove: dashboardProcedure.input(z.object({
    memberName: z.string().optional(),
    horseName: z.string().optional(),
  })).mutation(async ({ input, ctx }) => {
    const rider = await ctx.prisma.riderCombo.findFirst({
      where: {
        memberName: input?.memberName,
        horseName: input?.horseName,
      },
      select: {
        uid: true,
      },
    });

    if (!rider) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `${input.memberName} riding ${input.horseName} not found.`,
      });
    }

    return await prisma.riderCombo.delete({
      where: {
        uid: rider.uid,
      },
      select: {
        memberName: true,
        horseName: true,
      },
    });
  }),
});
