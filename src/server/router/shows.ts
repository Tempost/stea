import { z } from 'zod';
import { ShowCreateInputSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowCreateInputSchema';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import {
  ShowFindManyArgsSchema,
  ShowUpdateArgsSchema,
  ShowWhereUniqueInputSchema,
} from '../prisma/zod-generated';
import { getOne, create, update, deleteMany } from '../prisma/queries/shows';
import { findMany } from '../prisma/queries/shared';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

// TODO: Remove the use of TRPCError from the prisma query and move it here
//import { TRPCError } from '@trpc/server';
export const shows = router({
  all: procedure
    .input(ShowFindManyArgsSchema.optional())
    .query(async ({ input, ctx }) => {
      return findMany('Show', input, ctx.prisma);
    }),

  get: procedure
    .input(ShowWhereUniqueInputSchema)
    .query(async ({ input, ctx }) => {
      try {
        return getOne(input, ctx.prisma);
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
      return create(input, ctx.prisma);
    }),

  update: dashboardProcedure
    .input(ShowUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return update(input, ctx.prisma);
    }),

  remove: dashboardProcedure
    .input(z.array(z.string().cuid()))
    .mutation(async ({ input, ctx }) => {
      return deleteMany({ where: { uid: { in: input } } }, ctx.prisma);
    }),
});
