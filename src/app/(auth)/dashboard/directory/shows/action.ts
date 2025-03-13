'use server';
import { create, findMany, removeMany } from '@/server/prisma/queries/shared';
import { ShowOptionalDefaults } from '@/server/prisma/zod-generated';
import { readableDateTime } from '@/utils/helpers';
import { Show } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidateTag } from 'next/cache';

export interface ActionState {
  message: string;
  error: boolean;
  data?: ShowOptionalDefaults | Show;
}

export async function remove(uids: Array<string>) {
  await removeMany('Show', { where: { uid: { in: uids } } });
  revalidateTag('Shows');
  return {
    message: 'Success',
    error: false,
  };
}

export async function getShowsByYear(year: number) {
  return await findMany('Show', {
    where: {
      showDate: {
        lte: new Date(year, 11, 31),
        gte: new Date(year, 0, 1),
      },
    },
    orderBy: {
      showDate: 'asc',
    },
    include: {
      riders: true,
      points: true,
    },
  });
}

export async function add(show: ShowOptionalDefaults): Promise<ActionState> {
  try {
    const newShow = await create('Show', {
      data: {
        ...show,
      },
    });

    revalidateTag('Shows');
    return {
      message: 'Success',
      error: false,
      data: newShow,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          message: `${show.showName} already exists on the date of ${readableDateTime(show.showDate)}`,
          error: true,
          data: show,
        };
      }

      return {
        message: error.message,
        error: true,
        data: show,
      };
    }

    return {
      message: 'Unknown error',
      error: true,
      data: show,
    };
  }
}
