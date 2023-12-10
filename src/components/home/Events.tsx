import { trpc } from '@/utils/trpc';
import CalendarEvents from '../events/CalendarEvent';

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
      reviewed: false,
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

  if (shows.isError) {
    return <span className='my-12 text-center'>Unable to load shows</span>;
  }

  if (shows.isLoading) {
    return <span className='my-12 text-center'>Loading...</span>;
  }

  if (shows.data) {
    return (
      <>
        {shows.data.map(show => (
          <CalendarEvents
            key={`${show.showName}-${show.showDate}`}
            show={show}
          />
        ))}
      </>
    );
  }

  return <></>;
}

export default UpcomingEvents;
