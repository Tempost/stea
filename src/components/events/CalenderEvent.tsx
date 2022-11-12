import { readableDateTime } from '@/utils/helpers';
import { inferQueryOutput } from '@/utils/trpc';

interface CalenderEventsProps {
  show: NonNullable<inferQueryOutput<'shows.get-shows'>[number]>;
}

function CalenderEvents({ show }: CalenderEventsProps) {
  return (
    <div className='m-4 flex flex-col rounded-lg border p-2 shadow-xl'>
      <h3 className='border-b-2'>{show.showName}</h3>
      <p className=''>{readableDateTime(show.showDate)}</p>
      <p className=''>{show.showType}</p>

      <button className='btn-primary btn-sm btn'>Register</button>
    </div>
  );
}

export default CalenderEvents;
