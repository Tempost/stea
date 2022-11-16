import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { ShowModel } from '../prisma/zod';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { readableDateTime } from '@/utils/helpers';
import { ShowQueryInput } from '@/utils/zodschemas';

export const show = createRouter()
  .query('get-shows', {
    input: ShowQueryInput,
    async resolve({ input }) {
      const shows = await prisma.show
        .findMany({
          where: {
            showDate: {
              gte: input?.dateRange?.curr,
              lte: input?.dateRange?.end,
            },
          },
          include: input?.includes,
          orderBy: {
            showDate: 'asc'
          }
        })
        .then(shows => shows)
        .catch(err => {
          throw err;
        });

      return shows;
    },
  })
  .query('get-show', {
    input: z.object({ uid: z.string().cuid() }),
    async resolve({ input }) {
      try {
        return await prisma.show.findUniqueOrThrow({
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
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `${input.uid} not found.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: `Something went wrong fetching ${input.uid}`,
              cause: error,
            });
          }
        }
      }
    },
  })
  .mutation('add', {
    input: ShowModel.omit({ uid: true, reviewed: true }),
    async resolve({ input }) {
      console.info('Adding new show...', input);

      try {
        return await prisma.show.create({
          data: input,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            const showDate = readableDateTime(input.showDate);

            throw new TRPCError({
              code: 'CONFLICT',
              message: `A show at ${input.showName} on ${showDate} already exists, check the table and verify.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'CONFLICT',
              message: `Something went wrong adding show ${input.showName}.`,
              cause: error,
            });
          }
        }

        throw error;
      }
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
      console.log(patch);
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
