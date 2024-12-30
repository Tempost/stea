import ws from 'ws';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;
const schema = new URL(connectionString).searchParams.get('schema');

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool, schema ? { schema } : undefined);

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter: adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['info', 'error', 'warn']
        : ['error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClientSingleton;
};

export const prisma = prismaGlobal.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;

export type MyPrismaClient = typeof prisma;
