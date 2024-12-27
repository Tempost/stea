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
  ['Shows'],
  { revalidate: 3600, tags: ['Shows'] },
);

export default function Page() {
  const shows = use(getShows());

  return (
    <div className='mx-auto flex flex-col gap-2 rounded-lg p-5 shadow-xl sm:w-fit'>
      <SubmitPoints shows={shows} />
    </div>
  );
}
