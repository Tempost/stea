import { findMany } from '@/server/prisma/queries/shared';
import { unstable_cache } from 'next/cache';
import { use } from 'react';
import SubmitPoints from './submit';
import Card from '@/components/card/Card';

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
    <Card className='mx-auto shadow-xl sm:w-fit'>
      <Card.Body>
        <SubmitPoints shows={shows} />
      </Card.Body>
    </Card>
  );
}
