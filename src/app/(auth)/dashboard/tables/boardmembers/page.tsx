import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { Suspense, use } from 'react';
import BoardMembers from './BoardMembers';

const getBoardMembers = unstable_cache(
  async () => await findMany('Boardmember'),
  ['BoardMembers'],
  { revalidate: 3600, tags: ['BoardMembers'] },
);
function Page() {
  const boardmembers = use(getBoardMembers());
  return (
    <Suspense>
      <BoardMembers boardmembers={boardmembers} />
    </Suspense>
  );
}

export default Page;
