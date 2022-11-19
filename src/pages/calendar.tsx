import { ReactElement } from 'react';
import { useAtomValue } from 'jotai';

import { selectedMonth } from '@/utils/atoms';
import { PublicLayout } from '@/components/layout';
import { trpc } from '@/utils/trpc';
import CalendarEvents from '@/components/events/CalendarEvent';
import MonthSelector from '@/components/events/MonthSelector';
import { filterByMonths } from '@/utils/filterByMonths';

function SteaCalendar() {
  const shows = trpc.useQuery(['shows.get-shows']);
  const monthState = useAtomValue(selectedMonth);

  const filteredShows = filterByMonths(shows.data, monthState);

  return (
    <section className='flex h-full flex-col items-center justify-center'>
      <div className='flex min-h-[45vmax] w-full flex-col rounded-lg border p-10 shadow-xl sm:w-96'>
        <MonthSelector />

        {filteredShows ?
          filteredShows.map(show => (
            <CalendarEvents
              key={show.uid}
              show={show}
            />
          )) : <span className='my-12 text-center'>Loading...</span>}
      </div>
    </section>
  );
}

SteaCalendar.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalendar;
