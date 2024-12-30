import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';
import {
  CountArgs,
  CreateArgs,
  DeleteArgs,
  DeleteManyArgs,
  FindFirstArgs,
  FindManyArgs,
  FindUniqueArgs,
  FindUniqueOrThrowArgs,
  PrismaModelDelegate,
  PrismaModelPayload,
  PrismaModelProp,
  UpdateArgs,
  UpsertArgs,
} from '@/server/prisma/utils/types';

const getPrismaModelProp = <N extends Prisma.ModelName>(name: N) =>
  `${name.charAt(0).toLowerCase()}${name.slice(1)}` as PrismaModelProp<N>;
export const getPrismaDelegate = <N extends Prisma.ModelName>(
  name: N,
  prisma: MyPrismaClient,
) => prisma[getPrismaModelProp(name)] as PrismaModelDelegate<N> as any; // For generic model delegate

async function findFirst<T extends Prisma.ModelName>(
  table: T,
  findFirstArgs?: FindFirstArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).findFirst(
    findFirstArgs,
  );
}

async function findMany<T extends Prisma.ModelName>(
  table: T,
  findManyArgs?: FindManyArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<Array<PrismaModelPayload<T>['scalars']>> {
  return (prismaClient[getPrismaModelProp(table)] as any).findMany(
    findManyArgs,
  );
}

async function findUnique<T extends Prisma.ModelName>(
  table: T,
  findUniqueArgs?: FindUniqueArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).findUnique(
    findUniqueArgs,
  );
}

async function findUniqueOrThrow<T extends Prisma.ModelName>(
  table: T,
  findUniqueOrThrowArgs?: FindUniqueOrThrowArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).findUnique(
    findUniqueOrThrowArgs,
  );
}

async function count<T extends Prisma.ModelName>(
  table: T,
  coundArgs?: CountArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).count(coundArgs);
}

async function upsert<T extends Prisma.ModelName>(
  table: T,
  upsertArgs?: UpsertArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).upsert(upsertArgs);
}

async function update<T extends Prisma.ModelName>(
  table: T,
  updateArgs?: UpdateArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).update(updateArgs);
}

async function create<T extends Prisma.ModelName>(
  table: T,
  createArgs?: CreateArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).create(createArgs);
}

async function removeMany<T extends Prisma.ModelName>(
  table: T,
  removeManyArgs?: DeleteManyArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).deleteMany(
    removeManyArgs,
  );
}

async function remove<T extends Prisma.ModelName>(
  table: T,
  removeArgs?: DeleteArgs<T>,
  prismaClient: MyPrismaClient = prisma,
): Promise<PrismaModelPayload<T>['scalars']> {
  return (prismaClient[getPrismaModelProp(table)] as any).delete(removeArgs);
}

export {
  findMany,
  findUnique,
  findUniqueOrThrow,
  findFirst,
  count,
  upsert,
  update,
  create,
  removeMany,
  remove,
};
