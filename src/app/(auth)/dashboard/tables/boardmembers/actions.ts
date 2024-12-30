'use server';
import { Boardmember } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { update as updateBM } from '@/server/prisma/queries/shared';

export interface ActionState {
  message: string;
  error: boolean;
  data?: Boardmember;
}

export async function update(boardmember: Boardmember) {
  updateBM('Boardmember', {
    where: { position: boardmember.position },
    data: { ...boardmember },
  });

  revalidateTag('BoardMember');
  return {
    message: 'Success',
    error: false,
  };
}
