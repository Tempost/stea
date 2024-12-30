import { Suspense, use } from 'react';
import ShowsTable from './Shows';
import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';

const getShows = unstable_cache(
  async () => {
    return await findMany('Show', {
      where: {
        showDate: {
          lte: new Date(new Date().getFullYear(), 11, 31),
          gte: new Date(new Date().getFullYear(), 0, 1),
        },
      },
      orderBy: {
        showDate: 'asc',
      },
      include: {
        riders: true,
        points: true,
      },
    });
  },
  ['Shows'],
  { revalidate: 3600, tags: ['Shows'] },
);

function Page() {
  const shows = use(getShows());

  return (
    <Suspense>
      <ShowsTable data={shows} />
    </Suspense>
  );
}

export default Page;
