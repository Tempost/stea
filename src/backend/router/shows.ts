import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { ShowModel } from '../prisma/zod';
import { Show } from '@prisma/client';

export const show = createRouter()
  .query('get', {
    input: ShowModel.deepPartial(),
    async resolve({ input }) {
      const shows = await prisma.show
        .findMany({
          where: {
            ...input,
          },
          include: {
            riders: {
              include: {
                points: true,
              },
            },
          },
        })
        .then(shows => shows)
        .catch(err => console.log('Error:', err));
      console.log(shows);

      return shows as Show[];
    },
  })
  .mutation('add', {
    input: ShowModel.required(),
    async resolve({ input }) {
      await prisma.show
        .create({
          data: input,
        })
        .catch(err => console.log(err));
    },
  })
  .mutation('update', {
    input: ShowModel.deepPartial(),
    async resolve({ input: { uid, ...others } }) {
      await prisma.show
        .update({
          where: {
            uid: uid,
          },
          data: {
            ...others,
          },
        })
        .catch(err => console.log('Error:', err));
    },
  });
