'use server';

import { update } from '@/server/prisma/queries/shared';
import { MemberPartial } from '@/server/prisma/zod-generated';
import { updateTag } from 'next/cache';

export async function confirmMember({ fullName, ...data }: MemberPartial) {
  console.info(
    `Updating member ${fullName}...\n${JSON.stringify(data, null, 2)}`,
  );

  updateTag('Members');
  return await update('Member', {
    where: {
      fullName,
    },
    data,
  });
}
