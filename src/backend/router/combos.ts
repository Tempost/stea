import { createRouter } from './utils';

import { prisma } from '@/backend/prisma';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';


export const riders = createRouter()
  .query('get-riders', {
    input: z.object({
      memberName: z.string(),
      horseName: z.string(),
    }).deepPartial().optional(),
    async resolve({ input }) {
      const riders = await prisma.riderCombo.findMany({
        where: {
          memberName: input?.memberName,
          horseName: input?.horseName,
        },
        select: {
          member: true,
          horse: true,
          shows: true,
          points: true,
        },
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
        select: {
          member: true,
          horse: true,
          shows: true,
          points: true,
        },
      });

      if (!riders) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${input.memberName} riding ${input.horseName} not found.`,
        });
      }

      return riders;
    },
  });
