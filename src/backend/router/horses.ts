import { z } from 'zod';

import { createRouter } from './utils';

import { prisma } from '@/backend/prisma';
import { HorseModel } from '@/backend/prisma/zod';
import { Horse } from '@prisma/client';

export const horse = createRouter()
 .query('get-horses', {
    async resolve() {
      const horses = await prisma.horse
        .findMany()
        .then(horses => {
          return horses;
        })
        .catch(err => {
          console.log(err);
        });

      return horses as Horse[];
    },
  })
  .mutation('add-horse', {
    input: z.object({
      horse: HorseModel.required(),
      // .extend({
      //   riders: z.array(z.string()),
      // }),
    }),
    async resolve({ input }) {
      await prisma.horse
        .create({
          data: {
            ...input.horse,
          },
        })
        .catch(err => console.log(err));
    },
  });
