import NextLink from 'next/link';
import { CalenderIcon } from '../icons';

function UpcomingEvents() {
  return process.env.NODE_ENV === 'production' ? (
    <>
      <h2 className='text-xl'>Upcoming Events</h2>
      <NextLink href='/calender'>
        <button className='btn btn-primary btn-md grid grid-flow-col place-content-center gap-2'>
          {CalenderIcon} View Full Calender
        </button>
      </NextLink>

      {/* TODO: Grab shows happening in the next month and display here */}
      {/* TODO: Make some sort of event display component? */}
    </>
  ) : null;
}

export default UpcomingEvents;
