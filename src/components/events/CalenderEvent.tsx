import { readableDateTime } from '@/utils/helpers';
import { inferQueryOutput } from '@/utils/trpc';

interface CalenderEventsProps {
  show: NonNullable<inferQueryOutput<'shows.get-show'>>;
}

function CalenderEvents({ show }: CalenderEventsProps) {
  return (
    <div className='flex flex-col m-4 shadow-xl rounded-lg p-2 border'>
      <h3 className='border-b-2'>{show.showName}</h3>
      <p className=''>{readableDateTime(show.showDate)}</p>
      <p className=''>{show.showType}</p>

      <button className='btn-primary btn-sm btn'>Register</button>
    </div>
  );
}

export default CalenderEvents;
