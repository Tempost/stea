import { z } from 'zod';

import { createRouter } from './utils';

import { prisma } from '@/backend/prisma';
import { Horse } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { OwnerHorseFormValues } from '@/utils/zodschemas';

export const horse = createRouter()
  .query('get-horses', {
    async resolve() {
      const horses = await prisma.horse
        .findMany()
        .then(horses => {
          return horses;
        })
        .catch(_ => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch horses.',
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
  })
  .mutation('exists', {
    input: OwnerHorseFormValues.omit({ owner: true }),
    async resolve({ input }) {
      console.log(`Checking for horses... ${horseNames(input.horses)}`);
      const existingHorses = await checkExistingHorses(input.horses);

      if (existingHorses) {
        const message = `${existingHorses} ${
          existingHorses.length > 1 ? 'have' : 'has'
        } already been registered.`;

        throw new TRPCError({
          code: 'CONFLICT',
          message: message,
        });
      }
    },
  });

const horseNames = (horses: OwnerHorseFormValues['horses']) =>
  horses.map(horse => horse.horseRN);

async function checkExistingHorses(horses: OwnerHorseFormValues['horses']) {
  const matches = await prisma.horse.findMany({
    where: {
      horseRN: {
        in: horses.map(horse => horse.horseRN),
      },
    },
  });

  if (matches.length !== 0) {
    return horseNames(matches);
  }
}
