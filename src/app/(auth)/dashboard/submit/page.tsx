import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { use } from 'react';
import SubmitPoints from './submit';

export const revalidate = 3600;

const getShows = unstable_cache(
  async () => {
    return await findMany('Show', {
      where: { reviewed: false },
      orderBy: { showDate: 'asc' },
    });
  },
  ['shows'],
  { revalidate: 3600, tags: ['shows'] },
);

export default function Page() {
  const shows = use(getShows());

  return (
    <div className='mx-auto sm:w-fit'>
      <SubmitPoints shows={shows} />
    </div>
  );
}
