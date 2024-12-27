import { Prisma } from '@prisma/client';
import { MyPrismaClient } from '@/server/prisma';

export type PrismaModelProp<N extends Prisma.ModelName = Prisma.ModelName> =
  Uncapitalize<N>;
export type PrismaModelDelegate<N extends Prisma.ModelName = Prisma.ModelName> =
  MyPrismaClient[PrismaModelProp<N>];
export type PrismaModelType<N extends Prisma.ModelName = Prisma.ModelName> =
  Prisma.TypeMap['model'][N];
export type PrismaModelTypes = { [N in Prisma.ModelName]: PrismaModelType<N> };
export type PrismaModelPayload<N extends Prisma.ModelName = Prisma.ModelName> =
  PrismaModelType<N>['payload'];

export type FindManyArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['findMany']['args'];

export type FindUniqueArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['findUnique']['args'];

export type FindFirstArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['findFirst']['args'];

export type FindUniqueOrThrowArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['findUniqueOrThrow']['args'];

export type CountArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['count']['args'];

export type UpsertArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['upsert']['args'];

export type UpdateArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['update']['args'];

export type CreateArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['create']['args'];

export type DeleteManyArgs<N extends Prisma.ModelName> =
  PrismaModelType<N>['operations']['deleteMany']['args'];
