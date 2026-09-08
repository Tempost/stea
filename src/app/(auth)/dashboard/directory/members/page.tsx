import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';
import DashboardMembers from './Members';
import { memberDirectoryArgs } from '@/server/prisma/queries/args';

const getMembers = unstable_cache(
  async () => await findMany('Member', memberDirectoryArgs),
  ['Members'],
  { revalidate: 3600, tags: ['Members'] },
);
function Page() {
  const members = use(getMembers());

  return (
    <Suspense>
      <DashboardMembers members={members} />
    </Suspense>
  );
}

export default Page;
