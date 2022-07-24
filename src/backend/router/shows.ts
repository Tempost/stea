import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { ShowModel } from '../prisma/zod';

export const show = createRouter()
  .query('get-shows', {
    async resolve() {
      return await prisma.show
        .findMany()
        .then((shows) => {
          return shows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  })
  .mutation('add-Show', {
    input: ShowModel.required(),
    async resolve({ input }) {
      await prisma.show
        .create({
          data: input,
        })
        .catch((err) => console.log(err));
    },
  });
