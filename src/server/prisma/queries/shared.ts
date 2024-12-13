import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';
import {
  FindManyArgs,
  PrismaModelDelegate,
  PrismaModelPayload,
  PrismaModelProp,
} from '@/server/prisma/utils/types';

const getPrismaModelProp = <N extends Prisma.ModelName>(name: N) =>
  `${name.charAt(0).toLowerCase()}${name.slice(1)}` as PrismaModelProp<N>;
export const getPrismaDelegate = <N extends Prisma.ModelName>(
  name: N,
  prisma: MyPrismaClient
) => prisma[getPrismaModelProp(name)] as PrismaModelDelegate<N> as any; // For generic model delegate

async function findMany<T extends Prisma.ModelName>(
  table: T,
  findManyArgs?: FindManyArgs<T>,
  prismaClient: MyPrismaClient = prisma
): Promise<Array<PrismaModelPayload<T>['scalars']>> {
  return (prismaClient[getPrismaModelProp(table)] as any).findMany(
    findManyArgs
  );
}

export { findMany };
