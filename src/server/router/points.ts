import { dashboardProcedure, router } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const RequestForUpdate = z.object({
  riderUID: z.string(),
  showUID: z.string().cuid(),
  ammendPoints: z.number(),
});

const PointsSubmission = z.object({
  memberName: z.string(),
  horseName: z.string(),
  placing: z.number().min(1, { message: 'Invalid placing.' }),
  score: z.number(),
  division: z.string(),
  showUID: z.string().cuid(),
});

export const points = router({
  add: dashboardProcedure
    .input(PointsSubmission)
    .mutation(async ({ input, ctx }) => {}),
  update: dashboardProcedure
    .input(RequestForUpdate)
    .mutation(async ({ input, ctx }) => {
      const { riderUID, showUID, ammendPoints } = input;
      const riderPoints = await ctx.prisma.riderCombo.findUnique({
        where: { uid: riderUID },
        select: {
          points: true,
        },
      });
      console.log(riderPoints);

      if (!riderPoints) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${riderUID} not found.`,
        });
      }

      const validShow = await ctx.prisma.show.findUnique({
        where: { uid: showUID },
      });
      console.log(validShow);

      if (!validShow) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${showUID} not found.`,
        });
      }
    }),
  // remove: dashboardProcedure.input().mutation(),
});
