import { z } from 'zod';
import _ from 'lodash';

import { createRouter } from './utils';

import { prisma } from '@/backend/prisma';
import { HorseModel } from '@/backend/prisma/zod';

export const horse = createRouter()
  .query('get-horses', {
    async resolve() {
      return await prisma.horse
        .findMany()
        .then(horses => {
          return horses;
        })
        .catch(err => {
          console.log(err);
        });
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
