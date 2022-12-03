import { prisma } from '@/backend/prisma';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './utils';

const RequestForUpdate = z.object({
  riderUID: z.string(),
  showUID: z.string().cuid(),
  ammendPoints: z.number(),
});

const PointsSubmission = z.object({
  memberName: z.string(),
  horseName: z.string(),
  placing: z.number().min(1, { message: 'Invalid placing.' }),
  division: z.string(),
  showUID: z.string().cuid(),
});

export const points = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.token) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('add-points', {
    input: PointsSubmission.array(),
    async resolve({ input }) {},
  })
  .mutation('update-points', {
    input: RequestForUpdate,
    async resolve({ input }) {
      const { riderUID, showUID, ammendPoints } = input;
      const riderPoints = await prisma.riderCombo.findUnique({
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

      const validShow = await prisma.show.findUnique({
        where: { uid: showUID },
      });
      console.log(validShow);

      if (!validShow) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${showUID} not found.`,
        });
      }
    },
  });
