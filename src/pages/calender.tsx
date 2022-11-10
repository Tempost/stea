import { ReactElement } from 'react';
import { PublicLayout } from '@/components/layout';
import { trpc } from '@/utils/trpc';
import { readableDateTime } from '@/utils/helpers';
import CalenderEvents from '@/components/events/CalenderEvent';
import MonthSelector from '@/components/events/MonthSelector';

function SteaCalender() {
  const shows = trpc.useQuery(['shows.get-shows']);

  if (shows.data) console.log(readableDateTime(shows.data[0].showDate));

  return (
    <section className='flex h-full flex-col items-center justify-center'>
      <h1 className='mx-auto w-fit text-lg font-bold text-neutral md:text-2xl'>
        Coming soon...
      </h1>

      <div className='flex flex-col rounded-lg border p-10 shadow-xl'>
        <div className='flex'>
          <MonthSelector />
        </div>

        {shows.data &&
          shows.data.map(show => (
            <CalenderEvents
              key={show.uid}
              show={show}
            />
          ))}
      </div>
    </section>
  );
}

SteaCalender.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalender;
