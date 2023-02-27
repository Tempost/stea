import { trpc } from '@/utils/trpc';
import NextLink from 'next/link';
import CalendarEvents from '../events/CalendarEvent';
import { CalendarIcon } from '../icons';

const CURR_MONTH = new Date();
const MONTH_FROM_CURR = new Date(
  CURR_MONTH.getFullYear(),
  CURR_MONTH.getMonth() + 1,
  CURR_MONTH.getDate()
);

function UpcomingEvents() {
  const shows = trpc.shows.all.useQuery({
    where: {
      showDate: {
        lte: MONTH_FROM_CURR,
        gte: CURR_MONTH,
      },
    },
    orderBy: {
      showDate: 'asc',
    },
    select: {
      showDate: true,
      showEndDate: true,
      showName: true,
      showType: true,
    },
  });

  return (
    <div className='flex w-full flex-col rounded-lg border p-5 shadow-xl sm:w-96'>
      <h2 className='border-b-2 text-center text-xl'>Upcoming Events</h2>
      {shows.data ? (
        shows.data.map(show => (
          <CalendarEvents
            key={show.uid}
            show={show}
          />
        ))
      ) : (
        <span className='my-12 text-center'>Loading...</span>
      )}
      <NextLink
        href='/calendar'
        className='self-center'
      >
        <button className='btn-primary btn-md btn grid grid-flow-col place-content-center gap-2'>
          {CalendarIcon} View Full Calendar
        </button>
      </NextLink>
    </div>
  );
}

export default UpcomingEvents;
