import { Prisma, Status } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';

async function findUniqueOrThrow(
  args: Prisma.MemberWhereUniqueInput,
  prismaClient: MyPrismaClient = prisma
) {
  return await prismaClient.member.findUniqueOrThrow({
    where: args,
  });
}

async function findUnique(
  fullName: string,
  db: MyPrismaClient,
  memberStatus?: Status
) {
  return await db.member.findUnique({
    where: { fullName, memberStatus },
  });
}

export { findUniqueOrThrow, findUnique };
