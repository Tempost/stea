import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from '@/server/prisma';
import { inferAsyncReturnType } from '@trpc/server';
import { getToken } from 'next-auth/jwt';

export async function createContext(contextOptions: CreateNextContextOptions) {
  const req = contextOptions.req;
  const res = contextOptions.res;

  const token = await getToken({ req });

  return {
    req,
    res,
    token,
    prisma,
  };
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextMock(
  contextOptions: CreateNextContextOptions
) {
  const req = contextOptions.req;
  const res = contextOptions.res;

  const token = await getToken({ req });
  return {
    req,
    res,
    token,
  };
}

export type MockContext = inferAsyncReturnType<typeof createContextMock>;
export type TrpcContext = inferAsyncReturnType<typeof createContext>;
