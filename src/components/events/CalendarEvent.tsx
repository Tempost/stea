import { readableDateTime } from '@/utils/helpers';
import { Show } from '@prisma/client';
import List from '../list/List';
import { Button } from '../styled-ui/Button';
import { Link } from '@tanstack/react-router';

interface CalendarEventsProps {
  show: Show;
}

function CalendarEvents({ show }: CalendarEventsProps) {
  const date = show.showEndDate
    ? `${readableDateTime(show.showDate)} - ${readableDateTime(
        show.showEndDate,
      )}`
    : readableDateTime(show.showDate);

  return (
    <List.Row>
      <div className='m-4 flex flex-col rounded-lg border border-gray-200 p-2 text-center text-lg shadow-lg'>
        <h3>
          {show.showName} ({show.showType})
        </h3>
        <div className='divider mt-0 mb-0'></div>
        <p className='m-2'>{date}</p>

        {show.url && (
          <Link to={show.url}>
            <Button
              variant='primary'
              size='sm'
            >
              Register
            </Button>
          </Link>
        )}
      </div>
    </List.Row>
  );
}

export default CalendarEvents;
