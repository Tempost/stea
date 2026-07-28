import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';
import DashboardHorses from './Horses';
import { horseDashboardArgs } from '@/server/prisma/queries/args';

const getHorses = unstable_cache(
  async () => await findMany('Horse', horseDashboardArgs),
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
