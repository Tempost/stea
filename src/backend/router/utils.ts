import * as trpc from '@trpc/server';
import type { Context } from '@/backend/prisma';

export const createRouter = () => {
  return trpc.router<Context>();
};
