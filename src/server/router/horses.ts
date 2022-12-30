import { z } from 'zod';

import { Horse } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { ownerHorseFormSchema, OwnerHorseForm } from '@/utils/zodschemas';
import { procedure, router } from '@/server/trpc';
import { MyPrismaClient } from '../prisma';

export const horses = router({
  all: procedure.query(async ({ ctx }) => {
    const horses = await ctx.prisma.horse
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
  }),

  get: procedure
    .input(z.object({ horseRN: z.string() }))
    .query(async ({ input, ctx }) => {
      const { horseRN } = input;
      const horse = await ctx.prisma.horse.findUnique({
        where: { horseRN: horseRN },
      });

      if (!horse) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${horseRN} not found.`,
        });
      }

      return horse;
    }),

  exists: procedure
    .input(ownerHorseFormSchema.omit({ owner: true }))
    .mutation(async ({ input, ctx }) => {
      console.log(`Checking for horses... ${horseNames(input.horses)}`);
      const existingHorses = await checkExistingHorses(
        input.horses,
        ctx.prisma
      );

      if (existingHorses) {
        const message = `${existingHorses} ${
          existingHorses.length > 1 ? 'have' : 'has'
        } already been registered.`;

        throw new TRPCError({
          code: 'CONFLICT',
          message: message,
        });
      }
    }),
});

const horseNames = (horses: OwnerHorseForm['horses']) =>
  horses.map(horse => horse.horseRN);

async function checkExistingHorses(
  horses: OwnerHorseForm['horses'],
  db: MyPrismaClient
) {
  const matches = await db.horse.findMany({
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
