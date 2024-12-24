import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';

interface FindUniqueOrThrowArgs extends Prisma.MemberFindUniqueOrThrowArgs {
  client?: MyPrismaClient;
}

function findUniqueOrThrow({
  client = prisma,
  ...opts
}: FindUniqueOrThrowArgs) {
  return client.member.findUniqueOrThrow(opts);
}

interface FindUniqueArgs extends Prisma.MemberFindUniqueArgs {
  client?: MyPrismaClient;
}

function findUnique({ client = prisma, ...opts }: FindUniqueArgs) {
  return client.member.findUnique(opts);
}

export { findUniqueOrThrow, findUnique };
