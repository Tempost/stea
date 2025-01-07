import CalendarEvents from '../events/CalendarEvent';
import { findMany } from '@/server/prisma/queries/shared';
import { use } from 'react';

const CURR_MONTH = new Date();
const MONTH_FROM_CURR = new Date(
  CURR_MONTH.getFullYear(),
  CURR_MONTH.getMonth() + 1,
  CURR_MONTH.getDate(),
);

function UpcomingEvents() {
  const shows = use(
    findMany('Show', {
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
    }),
  );

  return (
    <>
      {shows.map(show => (
        <CalendarEvents
          key={`${show.showName}-${show.showDate}`}
          show={show}
        />
      ))}
    </>
  );
}

export default UpcomingEvents;
