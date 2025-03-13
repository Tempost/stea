'use server';
import { z } from 'zod';
import { NewMemberSchema } from './NewMemberForm';
import { create } from '@/server/prisma/queries/shared';
import { revalidateTag } from 'next/cache';
import { Member } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface ActionState {
  message: string;
  error: boolean;
  data: Member | undefined;
}

export default async function add(member: z.infer<typeof NewMemberSchema>) {
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
      console.log(`${member.firstName} ${member.lastName} is already a member`);

      if (error.code === 'P2002')
        return {
          message: `${member.firstName} ${member.lastName} is already registered`,
          error: true,
          data: undefined,
        };

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
