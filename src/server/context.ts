import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from '@/server/prisma';
import { inferAsyncReturnType } from '@trpc/server';
import { getToken, JWT } from 'next-auth/jwt';

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  token: JWT | null;
}

export async function createInnerContext(
  contextOptions: CreateInnerContextOptions
) {
  return {
    prisma,
    token: contextOptions.token,
  };
}

export async function createContext(contextOptions: CreateNextContextOptions) {
  const req = contextOptions.req;
  const res = contextOptions.res;

  const token = await getToken({ req });
  const contextInner = await createInnerContext({ token });

  return {
    ...contextInner,
    req,
    res,
  };
}

export type ContextInner = inferAsyncReturnType<typeof createInnerContext>;
export type Context = inferAsyncReturnType<typeof createContext>;
