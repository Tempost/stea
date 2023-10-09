import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma =
  prismaGlobal.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['info', 'error', 'warn']
        : ['error'],
  }).$extends(withAccelerate());

// @ts-ignore TODO: Fix this type issue
if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;

export type MyPrismaClient = typeof prisma;
