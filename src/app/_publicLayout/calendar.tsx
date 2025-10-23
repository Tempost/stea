import Calendar from '@/components/Calendar';
import Loading from '@/components/styled-ui/Loading';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { getShows } from '../../server/functions/serverFunctions';

export const Route = createFileRoute('/_publicLayout/calendar')({
  component: CalendarPage,
  loader: () => getShows(),
});

function CalendarPage() {
  const shows = Route.useLoaderData();

  return (
    <section className='flex h-full flex-col items-center justify-center gap-2 p-4 sm:p-8 md:p-10 lg:p-16'>
      <h1 className='text-xl'>Show Calendar</h1>
      <div className='flex min-h-[45vmax] w-full flex-col sm:w-96'>
        <Suspense fallback={<Loading />}>
          <Calendar shows={shows} />
        </Suspense>
      </div>
    </section>
  );
}
