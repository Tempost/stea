'use server';
import { z } from 'zod';
import { NewMemberSchema } from './NewMemberForm';
import { create } from '@/server/prisma/queries/shared';
import { revalidateTag } from 'next/cache';

export default async function add(member: z.infer<typeof NewMemberSchema>) {
  const newMember = create('Member', {
    data: { fullName: `${member.firstName} ${member.lastName}`, ...member },
  });

  revalidateTag('Members');
  return newMember;
}
