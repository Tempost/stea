import { Suspense, use } from 'react';
import DashboardRiders from './Riders';
import { unstable_cache } from 'next/cache';
import { findMany } from '@/server/prisma/queries/shared';

const getRiders = unstable_cache(
  async () => {
    return findMany('RiderCombo', {
      orderBy: [
        { showYear: 'desc' },
        {
          division: 'desc',
        },
        {
          member: {
            memberStatusType: 'asc',
          },
        },
        { totalPoints: 'desc' },
      ],
      include: { horse: true, member: true },
    });
  },
  ['RiderCombos'],
  { revalidate: 3600, tags: ['RidersCombos'] },
);

function Page() {
  const riders = use(getRiders());
  return (
    <Suspense>
      <DashboardRiders riders={riders} />
    </Suspense>
  );
}

export default Page;
