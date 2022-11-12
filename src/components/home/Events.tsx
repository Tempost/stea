import { trpc } from '@/utils/trpc';
import NextLink from 'next/link';
import CalenderEvents from '../events/CalenderEvent';
import { CalenderIcon } from '../icons';

const CURR_MONTH = new Date();
const MONTH_FROM_CURR = new Date(
  CURR_MONTH.getFullYear(),
  CURR_MONTH.getMonth() + 1,
  CURR_MONTH.getDate()
);

function UpcomingEvents() {
  const shows = trpc.useQuery([
    'shows.get-shows',
    {
      dateRange: {
        curr: CURR_MONTH,
        end: MONTH_FROM_CURR,
      },
    },
  ]);

  return process.env.NODE_ENV !== 'production' ? (
    <div className='flex w-full flex-col rounded-lg border p-5 shadow-xl sm:w-96'>
      <h2 className='border-b-2 text-center text-xl'>Upcoming Events</h2>
      {shows.data &&
        shows.data.map(show => (
          <CalenderEvents
            key={show.uid}
            show={show}
          />
        ))}
      <NextLink
        href='/calender'
        className='self-center'
      >
        <button className='btn-primary btn-md btn grid grid-flow-col place-content-center gap-2'>
          {CalenderIcon} View Full Calender
        </button>
      </NextLink>

      {/* TODO: Grab shows happening in the next month and display here */}
      {/* TODO: Make some sort of event display component? */}
    </div>
  ) : null;
}

export default UpcomingEvents;
