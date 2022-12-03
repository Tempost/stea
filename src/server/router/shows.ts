import { ShowModel } from '../prisma/zod';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { readableDateTime } from '@/utils/helpers';
import { ShowQueryInput } from '@/utils/zodschemas';
import { dashboardProcedure, procedure, router } from '@/server/trpc';

const ShowPatch = z.object({
  uid: z.string().cuid(),
  patch: ShowModel.omit({
    uid: true,
    createdAt: true,
    updatedAt: true,
  }).deepPartial(),
});

export const shows = router({
  all: procedure.input(ShowQueryInput).query(async ({ input, ctx }) => {
    const shows = await ctx.prisma.show
      .findMany({
        where: {
          showDate: {
            gte: input?.dateRange?.curr,
            lte: input?.dateRange?.end,
          },
        },
        include: input?.includes,
        orderBy: {
          showDate: 'asc',
        },
      })
      .then(shows => shows)
      .catch(err => {
        throw err;
      });

    return shows;
  }),

  get: procedure.input(z.object({ uid: z.string().cuid() })).query(async ({ input, ctx }) => {
    try {
      return await ctx.prisma.show.findUniqueOrThrow({
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
  }),

  add: dashboardProcedure.input(ShowModel.omit({ uid: true, reviewed: true })).mutation(async ({ input, ctx }) => {
    console.info('Adding new show...', input);

    try {
      return await ctx.prisma.show.create({
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
  }),

  update: dashboardProcedure.input(ShowPatch).mutation(async ({ input: { uid, patch }, ctx }) => {
    console.log(patch);
    return await ctx.prisma.show.update({
      where: {
        uid: uid,
      },
      data: {
        ...patch,
      },
    });
  }),

  remove: dashboardProcedure.input(z.object({ uid: z.string().cuid() })).mutation(async ({ input, ctx }) => {
    return await ctx.prisma.show.delete({ where: { uid: input.uid } });
  }),
});
