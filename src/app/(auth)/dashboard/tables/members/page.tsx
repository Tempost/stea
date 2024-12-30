import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';
import DashboardMembers from './Members';

const getMembers = unstable_cache(
  async () =>
    await findMany('Member', {
      orderBy: [
        { memberStatusType: 'asc' },
        { membershipEnd: { sort: 'desc', nulls: 'last' } },
      ],
      select: {
        fullName: true,
        memberStatusType: true,
        memberStatus: true,
        membershipDate: true,
        memberType: true,
        email: true,
        phone: true,
        membershipEnd: true,
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
