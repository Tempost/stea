import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

const getOwners = unstable_cache(
  async () =>
    await findMany('NonMemberHorseOwner', { select: { fullName: true } }),
  ['Owners'],
  { revalidate: 3600, tags: ['Owners'] },
);

export async function GET() {
  return NextResponse.json(await getOwners(), { status: 200 });
}
