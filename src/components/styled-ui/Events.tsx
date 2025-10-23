import CalendarEvents from '../events/CalendarEvent';
import List from '../list/List';
import { Show } from '@prisma/client';

function UpcomingEvents({ events }: { events: Array<Show> }) {
  return (
    <List>
      {events.map(show => (
        <CalendarEvents
          key={`${show.showName}-${show.showDate}`}
          show={show}
        />
      ))}
    </List>
  );
}

export default UpcomingEvents;
