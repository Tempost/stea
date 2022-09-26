import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { ShowModel } from '../prisma/zod';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const show = createRouter()
  .query('get-shows', {
    async resolve() {
      const shows = await prisma.show
        .findMany({
          include: {
            points: true,
            riders: {
              include: {
                points: true,
              },
            },
          },
        })
        .then(shows => shows);

      return shows;
    },
  })
  .query('get-show', {
    input: z.object({ uid: z.string().cuid() }),
    async resolve({ input }) {
      const shows = await prisma.show.findUnique({
        where: {
          uid: input.uid,
        },
        include: {
          riders: {
            include: {
              points: true,
            },
          },
        },
      });

      if (!shows) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${input.uid} not found.`,
        });
      }

      return shows;
    },
  })
  .mutation('add', {
    input: ShowModel.omit({ uid: true, reviewed: true }),
    async resolve({ input }) {
      console.log(input);
      return await prisma.show.create({
        data: input,
      });
    },
  })
  .mutation('update', {
    input: z.object({
      uid: z.string().cuid(),
      patch: ShowModel.omit({
        uid: true,
        createdAt: true,
        updatedAt: true,
      }).deepPartial(),
    }),
    async resolve({ input: { uid, patch } }) {
      return await prisma.show.update({
        where: {
          uid: uid,
        },
        data: {
          ...patch,
        },
      });
    },
  })
  .mutation('remove-show', {
    input: z.object({ uid: z.string().cuid() }),
    async resolve({ input }) {
      return await prisma.show.delete({ where: { uid: input.uid } });
    },
  });
