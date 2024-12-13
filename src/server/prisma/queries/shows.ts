import { MyPrismaClient, prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { TRPCError } from '@trpc/server';
import { readableDateTime } from '@/utils/helpers';

async function getOne(
  whereUniqueArgs: Prisma.ShowWhereUniqueInput,
  prismaClient: MyPrismaClient = prisma
) {
  return await prismaClient.show.findUniqueOrThrow({
    where: whereUniqueArgs,
  });
}

async function create(
  createArgs: Prisma.ShowCreateInput,
  prismaClient: MyPrismaClient = prisma
) {
  console.info('Adding new show...', createArgs);

  try {
    return await prismaClient.show.create({
      data: createArgs,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const showDate = readableDateTime(createArgs.showDate);

        throw new TRPCError({
          code: 'CONFLICT',
          message: `A show at ${createArgs.showName} on ${showDate} already exists, check the table and verify.`,
          cause: error,
        });
      } else {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Something went wrong adding show ${createArgs.showName}.`,
          cause: error,
        });
      }
    }

    throw error;
  }
}

async function update(
  args: Prisma.ShowUpdateArgs<DefaultArgs>,
  prismaClient: MyPrismaClient = prisma
) {
  return await prismaClient.show.update(args);
}

async function deleteMany(
  args: Prisma.ShowDeleteManyArgs<DefaultArgs>,
  prismaClient: MyPrismaClient = prisma
) {
  return await prismaClient.show.deleteMany(args);
}

export { getOne, create, update, deleteMany };
