import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma =
  prismaGlobal.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
// export const createContext = async ({
//   req,
//   res,
// }: trpcNext.CreateNextContextOptions) => {
//   // for API-response caching see https://trpc.io/docs/caching
//   return {
//     req,
//     res,
//     prisma,
//   };
// };

interface CreateContextOptions {
  // session: Session | null
}
/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  return await createContextInner({});
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;
