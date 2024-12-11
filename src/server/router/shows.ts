import { z } from 'zod';
import { ShowCreateInputSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowCreateInputSchema';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { readableDateTime } from '@/utils/helpers';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import {
  ShowFindManyArgsSchema,
  ShowUpdateArgsSchema,
  ShowWhereUniqueInputSchema,
} from '../prisma/zod-generated';

export const shows = router({
  all: procedure
    .input(ShowFindManyArgsSchema.optional())
    .query(async ({ input, ctx }) => {
      const shows = await ctx.prisma.show
        .findMany(input)
        .then(shows => shows)
        .catch(err => {
          throw err;
        });

      return shows;
    }),

  get: procedure
    .input(ShowWhereUniqueInputSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.show.findUniqueOrThrow({
          where: input,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `${input.uid ?? input.showName_showDate} not found.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: `Something went wrong fetching ${
                input.uid ?? input.showName_showDate
              }`,
              cause: error,
            });
          }
        }
      }
    }),

  add: dashboardProcedure
    .input(ShowCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
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

  update: dashboardProcedure
    .input(ShowUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return await ctx.prisma.show.update(input);
    }),

  remove: dashboardProcedure
    .input(z.array(z.string().cuid()))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.show.deleteMany({
        where: { uid: { in: input } },
      });
    }),
});
