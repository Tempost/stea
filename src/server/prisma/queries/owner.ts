import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '..';

interface UpsertArgs extends Prisma.NonMemberHorseOwnerUpsertArgs {
  client?: MyPrismaClient;
}

const upsert = ({ client = prisma, ...args }: UpsertArgs) =>
  client.nonMemberHorseOwner.upsert(args);

interface FindUniqueOrThrowArgs
  extends Prisma.NonMemberHorseOwnerFindUniqueArgs {
  client?: MyPrismaClient;
}

const findUniqueOrThrow = ({
  client = prisma,
  ...opts
}: FindUniqueOrThrowArgs) => client.nonMemberHorseOwner.findUniqueOrThrow(opts);

interface FindUniqueArgs extends Prisma.NonMemberHorseOwnerFindUniqueArgs {
  client?: MyPrismaClient;
}

const findUnique = ({ client = prisma, ...opts }: FindUniqueArgs) =>
  client.nonMemberHorseOwner.findUnique(opts);

interface FindFirstArgs extends Prisma.NonMemberHorseOwnerFindFirstArgs {
  client?: MyPrismaClient;
}

const findFirst = ({ client = prisma, ...opts }: FindFirstArgs) =>
  client.nonMemberHorseOwner.findFirst(opts);

interface UpdateArgs extends Prisma.NonMemberHorseOwnerUpdateArgs {
  client?: MyPrismaClient;
}

const update = ({ client = prisma, ...opts }: UpdateArgs) =>
  client.nonMemberHorseOwner.update(opts);

interface CreateArgs extends Prisma.NonMemberHorseOwnerCreateArgs {
  client?: MyPrismaClient;
}

const create = ({ client = prisma, ...args }: CreateArgs) =>
  client.nonMemberHorseOwner.create(args);

export { findUniqueOrThrow, findUnique, findFirst, update, create, upsert };
