import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { ShowModel } from '../prisma/zod';
import { Show } from '@prisma/client';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const show = createRouter()
  .query('get-shows', {
    async resolve() {
      const shows = await prisma.show
        .findMany({
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
  .query('get-show', {
    input: z.object({ uid: z.string().cuid() }),
    async resolve({ input }) {
      const shows = await prisma.show
        .findUnique({
          where: {
            uid: input.uid
          },
          include: {
            riders: {
              include: {
                points: true,
              },
            },
          },
        })

      if (!show) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${input.uid} not found.`,
        });
      }

      return shows;
    },
  })
  .mutation('add', {
    input: ,
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
