import { checkAuth } from '@/auth';
import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

const getMembers = unstable_cache(
  async () => await findMany('Member', { select: { fullName: true } }),
  ['Members'],
  { revalidate: 3600, tags: ['Members'] },
);

export const GET = checkAuth(
  async () => NextResponse.json(await getMembers(), { status: 200 }),
  // WARN: REMOVE THIS WHEN https://github.com/nextauthjs/next-auth/issues/12224 is fixed
) as any;
