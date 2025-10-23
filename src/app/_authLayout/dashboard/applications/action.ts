'use server';

import { update } from '@/server/prisma/queries/shared';
import { MemberPartial } from '@/server/prisma/zod-generated';
import { revalidateTag } from 'next/cache';

export async function confirmMember({ fullName, ...data }: MemberPartial) {
  console.info(
    `Updating member ${fullName}...\n${JSON.stringify(data, null, 2)}`,
  );

  revalidateTag('Members');
  return await update('Member', {
    where: {
      fullName,
    },
    data,
  });
}
