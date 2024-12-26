import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';

interface FindUniqueOrThrowArgs extends Prisma.MemberFindUniqueOrThrowArgs {
  client?: MyPrismaClient;
}

const findUniqueOrThrow = ({
  client = prisma,
  ...opts
}: FindUniqueOrThrowArgs) => client.member.findUniqueOrThrow(opts);

interface FindUniqueArgs extends Prisma.MemberFindUniqueArgs {
  client?: MyPrismaClient;
}

const findUnique = ({ client = prisma, ...opts }: FindUniqueArgs) =>
  client.member.findUnique(opts);

interface FindFirstArgs extends Prisma.MemberFindFirstArgs {
  client?: MyPrismaClient;
}

const findFirst = ({ client = prisma, ...opts }: FindFirstArgs) =>
  client.member.findFirst(opts);

interface UpdateArgs extends Prisma.MemberUpdateArgs {
  client?: MyPrismaClient;
}

const update = ({ client = prisma, ...opts }: UpdateArgs) =>
  client.member.update(opts);

interface CreateArgs extends Prisma.MemberCreateArgs {
  client?: MyPrismaClient;
}

const create = ({ client = prisma, ...args }: CreateArgs) =>
  client.member.create(args);

interface UpsertArgs extends Prisma.MemberUpsertArgs {
  client?: MyPrismaClient;
}

const upsert = ({ client = prisma, ...opts }: UpsertArgs) =>
  client.member.upsert(opts);

export { findUniqueOrThrow, findUnique, findFirst, update, create, upsert };
