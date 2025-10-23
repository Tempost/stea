import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';
import DashboardOwners from './Owners';

const getOwners = unstable_cache(
  async () => {
    return await findMany('NonMemberHorseOwner', {
      select: {
        fullName: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });
  },
  ['Owners'],
  { revalidate: 3600, tags: ['Owners'] },
);

function Page() {
  const owners = use(getOwners());
  return (
    <Suspense>
      <DashboardOwners owners={owners} />
    </Suspense>
  );
}

export default Page;
