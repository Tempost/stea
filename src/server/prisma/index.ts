import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma =
  prismaGlobal.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['info', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;

export type MyPrismaClient = typeof prisma;
