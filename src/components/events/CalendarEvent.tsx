import { readableDateTime } from '@/utils/helpers';
import { Show } from '@prisma/client';
import Link from 'next/link';

interface CalendarEventsProps {
  show: Show;
}

function CalendarEvents({ show }: CalendarEventsProps) {
  const date = show.showEndDate
    ? `${readableDateTime(show.showDate)} - ${readableDateTime(
        show.showEndDate
      )}`
    : readableDateTime(show.showDate);

  return (
    <div className='m-4 flex flex-col rounded-lg border p-2 text-center text-lg shadow-xl'>
      <h3 className='border-b-2'>
        {show.showName} ({show.showType})
      </h3>
      <p className='m-2 text-lg'>{date}</p>

      {show.url && (
        <Link
          href={show.url}
          className='btn-primary btn-sm btn'
        >
          Register
        </Link>
      )}
    </div>
  );
}

export default CalendarEvents;
