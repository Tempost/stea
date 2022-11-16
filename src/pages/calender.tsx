import { ReactElement } from 'react';
import { useAtomValue } from 'jotai';

import { selectedMonth } from '@/utils/atoms';
import { PublicLayout } from '@/components/layout';
import { inferQueryOutput, trpc } from '@/utils/trpc';
import CalenderEvents from '@/components/events/CalenderEvent';
import MonthSelector from '@/components/events/MonthSelector';

function filterByMonths(
  shows: inferQueryOutput<'shows.get-shows'> | undefined,
  currMonth: number
) {
  if (!shows) return;

  return shows.filter(show => {
    if (show.showDate.getMonth() === currMonth) {
      return true;
    }
    return false;
  });
}

function SteaCalender() {
  const shows = trpc.useQuery(['shows.get-shows']);
  const monthState = useAtomValue(selectedMonth);

  const filteredShows = filterByMonths(shows.data, monthState);
  console.log(filteredShows);

  return (
    <section className='flex h-full flex-col items-center justify-center'>
      <div className='flex min-h-[45vmax] w-full flex-col rounded-lg border p-10 shadow-xl sm:w-96'>
        <MonthSelector />

        {filteredShows ?
          filteredShows.map(show => (
            <CalenderEvents
              key={show.uid}
              show={show}
            />
          )) : <span className='my-12 text-center'>Loading...</span>}
      </div>
    </section>
  );
}

SteaCalender.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalender;
