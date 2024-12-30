import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const getMembers = unstable_cache(
  async () => await findMany('Member', { select: { fullName: true } }),
  ['Members'],
  { revalidate: 3600, tags: ['Members'] },
);

export async function GET(req: NextRequest) {
  return NextResponse.json(await getMembers(), { status: 200 });
}
