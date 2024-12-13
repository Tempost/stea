import { Prisma } from '@prisma/client';
import { MyPrismaClient, prisma } from '@/server/prisma';

async function findUniqueOrThrow(
  args: Prisma.MemberWhereUniqueInput,
  prismaClient: MyPrismaClient = prisma
) {
  return await prismaClient.member.findUniqueOrThrow({
    where: args,
  });
}

export { findUniqueOrThrow };
