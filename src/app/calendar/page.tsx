import { use } from 'react';
import { findMany } from '@/server/prisma/queries/shared';
import Calendar from '@/components/Calendar';

function CalendarPage() {
  const shows = use(
    findMany('Show', {
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
    })
  );

  return (
    <section className='flex h-full flex-col items-center justify-center'>
      <div className='flex min-h-[45vmax] w-full flex-col rounded-lg border p-10 shadow-xl sm:w-96'>
        <Calendar shows={shows} />
      </div>
    </section>
  );
}

export default CalendarPage;
