import { Suspense, use } from 'react';
import { findMany } from '@/server/prisma/queries/shared';
import Calendar from '@/components/Calendar';
import { unstable_cache } from 'next/cache';
import Loading from '@/components/styled-ui/Loading';

const getShows = unstable_cache(
  async () => {
    return await findMany('Show', {
      orderBy: {
        showDate: 'asc',
      },
      where: {
        reviewed: false,
      },
      select: {
        showDate: true,
        showEndDate: true,
        showName: true,
        showType: true,
      },
    });
  },
  ['Shows'],
  { revalidate: 3600, tags: ['Shows'] },
);

function CalendarPage() {
  const shows = use(getShows());

  return (
    <section className='flex h-full flex-col items-center justify-center gap-2'>
      <h1 className='text-xl'>Show Calender</h1>
      <div className='flex min-h-[45vmax] w-full flex-col sm:w-96'>
        <Suspense fallback={<Loading />}>
          <Calendar shows={shows} />
        </Suspense>
      </div>
    </section>
  );
}

export default CalendarPage;
