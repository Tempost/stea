import DashboardMembers from '@/components/dashboard/tables/Members';
import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';

const getMembers = unstable_cache(
  async () =>
    await findMany('Member', {
      orderBy: {
        memberStatusType: 'asc',
      },
      select: {
        fullName: true,
        memberStatusType: true,
        memberStatus: true,
        membershipDate: true,
        memberType: true,
        email: true,
        phone: true,
      },
    }),
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
