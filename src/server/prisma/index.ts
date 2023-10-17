import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['info', 'error', 'warn']
        : ['error'],
  }).$extends(withAccelerate());
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClientSingleton;
};

export const prisma = prismaGlobal.prisma ?? prismaClientSingleton();

// @ts-ignore TODO: Fix this type issue
if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;

export type MyPrismaClient = typeof prisma;
