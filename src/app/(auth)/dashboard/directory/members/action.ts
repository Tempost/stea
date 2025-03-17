'use server';
import { z } from 'zod';
import { NewMemberSchema } from './NewMemberForm';
import {
  create,
  findFirst,
  update as prismaUpdate,
} from '@/server/prisma/queries/shared';
import { revalidateTag } from 'next/cache';
import { Member } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { unstable_cache } from 'next/cache';
import { MemberUpdateSchema } from './UpdateMember';

export interface ActionState {
  message: string;
  error: boolean;
  data: Member | undefined;
}

export async function add(member: z.infer<typeof NewMemberSchema>) {
  try {
    const newMember = create('Member', {
      data: { fullName: `${member.firstName} ${member.lastName}`, ...member },
    });

    revalidateTag('Members');

    return {
      message: 'Success',
      error: false,
      data: await newMember,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(
          `${member.firstName} ${member.lastName} is already a member`,
        );
        return {
          message: `${member.firstName} ${member.lastName} is already registered`,
          error: true,
          data: undefined,
        };
      }

      return {
        message: 'Unknown error.',
        error: true,
        data: undefined,
      };
    }

    return {
      message: 'Unknown error.',
      error: true,
      data: undefined,
    };
  }
}

export async function update(
  member: z.infer<typeof MemberUpdateSchema>,
): Promise<ActionState> {
  try {
    const updated = await prismaUpdate('Member', {
      where: { fullName: member.fullName },
      data: member,
    });
    revalidateTag('Members');
    revalidateTag(member.fullName);
    return { message: 'Success', error: false, data: updated };
  } catch (error) {
    // FIX: Fix as any later...
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        message: error.message,
        error: true,
        data: member as any,
      };
    }

    return {
      message: 'Unknown error.',
      error: true,
      data: member as any,
    };
  }
}

export async function get(fullName: string) {
  const getMember = unstable_cache(
    async (fullName: string) =>
      await findFirst('Member', {
        where: { fullName: { equals: fullName, mode: 'insensitive' } },
      }),
    [fullName],
    { revalidate: 3600, tags: ['Members', fullName] },
  );

  return getMember(fullName);
}
