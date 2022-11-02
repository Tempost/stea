import { z } from 'zod';

import { createRouter } from './utils';

import { prisma } from '@/backend/prisma';
import { Horse } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const horse = createRouter()
  .query('get-horses', {
    async resolve() {
      const horses = await prisma.horse
        .findMany()
        .then(horses => {
          return horses;
        })
        .catch(error => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch horses',
          });
        });

      return horses as Horse[];
    },
  })
  .query('get-horse', {
    input: z.object({ horseRN: z.string() }),
    async resolve({ input }) {
      const { horseRN } = input;
      const horse = await prisma.horse.findUnique({
        where: { horseRN: horseRN },
      });

      if (!horse) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${horseRN} not found.`,
        });
      }

      return horse;
    },
  });
