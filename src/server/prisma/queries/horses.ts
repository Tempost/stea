import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';

interface FindManyHorseArgs extends Prisma.HorseFindManyArgs {
  client?: MyPrismaClient;
}

export async function checkExistingHorses({
  client = prisma,
  ...args
}: FindManyHorseArgs) {
  const matches = await client.horse.findMany(args);

  if (matches.length !== 0) {
    return matches;
  }
}
