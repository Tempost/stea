import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';
import Applications from './Applications';

const getMembers = unstable_cache(
  async () => await findMany('Member', { where: { confirmed: false } }),
  ['Members'],
  { revalidate: 900, tags: ['Members'] },
);

function Page() {
  const members = use(getMembers());

  return (
    <Suspense>
      <Applications members={members} />
    </Suspense>
  );
}

export default Page;
