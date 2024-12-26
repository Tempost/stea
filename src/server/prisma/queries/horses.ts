import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';

interface FindManyHorseArgs extends Prisma.HorseFindManyArgs {
  client?: MyPrismaClient;
}

async function checkExistingHorses({
  client = prisma,
  ...args
}: FindManyHorseArgs) {
  const matches = await client.horse.findMany(args);

  if (matches.length !== 0) {
    return matches;
  }
}

interface UpdateArgs extends Prisma.HorseUpdateArgs {
  client?: MyPrismaClient;
}

const update = ({ client = prisma, ...args }: UpdateArgs) =>
  client.horse.update(args);

interface UpsertArgs extends Prisma.HorseUpsertArgs {
  client?: MyPrismaClient;
}

const upsert = ({ client = prisma, ...args }: UpsertArgs) =>
  client.horse.upsert(args);

interface CreateArgs extends Prisma.HorseCreateArgs {
  client?: MyPrismaClient;
}

const create = ({ client = prisma, ...args }: CreateArgs) =>
  client.horse.create(args);

export { update, upsert, checkExistingHorses, create };
