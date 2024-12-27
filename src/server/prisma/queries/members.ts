import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';

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

export { update, create, upsert };
