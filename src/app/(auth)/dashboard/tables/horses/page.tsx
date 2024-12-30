import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';
import DashboardHorses from './Horses';

const getHorses = unstable_cache(
  async () =>
    await findMany('Horse', {
      orderBy: {
        registrationEnd: { sort: 'desc', nulls: 'last' },
      },
      select: {
        registrationDate: true,
        registrationEnd: true,
        horseRN: true,
        regType: true,
        memberName: true,
        owner: true,
      },
    }),
  ['Horses'],
  { revalidate: 3600, tags: ['Horses'] },
);

function Page() {
  const horses = use(getHorses());

  return (
    <Suspense>
      <DashboardHorses horses={horses} />
    </Suspense>
  );
}

export default Page;
