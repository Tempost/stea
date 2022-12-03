import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';

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

export const riders = createRouter()
  .query('get-riders', {
    input: z
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
      .optional(),
    async resolve({ input }) {
      const riders = await prisma.riderCombo.findMany({
        where: {
          memberName: input?.memberName,
          horseName: input?.horseName,
        },
        select: input?.selectFields ?? selectFields,
      });

      return riders;
    },
  })
  .query('get-rider', {
    input: z.object({
      memberName: z.string().optional(),
      horseName: z.string().optional(),
    }),
    async resolve({ input }) {
      const riders = await prisma.riderCombo.findFirst({
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
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.token) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('remove-rider', {
    input: z.object({
      memberName: z.string().optional(),
      horseName: z.string().optional(),
    }),
    async resolve({ input }) {
      const rider = await prisma.riderCombo.findFirst({
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
    },
  });
