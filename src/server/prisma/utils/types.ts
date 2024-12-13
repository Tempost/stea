import { Prisma } from '@prisma/client';
import { MyPrismaClient } from '@/server/prisma';

export type PrismaModelProp<N extends Prisma.ModelName = Prisma.ModelName> =
  Uncapitalize<N>;
export type PrismaModelDelegate<N extends Prisma.ModelName = Prisma.ModelName> =
  MyPrismaClient[PrismaModelProp<N>];
export type PrismaModelType<N extends Prisma.ModelName = Prisma.ModelName> =
  Prisma.TypeMap['model'][N];
export type PrismaModelTypes = { [N in Prisma.ModelName]: PrismaModelType<N> };
export type FindManyArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['findMany']['args'];
export type PrismaModelPayload<N extends Prisma.ModelName = Prisma.ModelName> =
  PrismaModelType<N>['payload'];
