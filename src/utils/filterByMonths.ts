import { Show } from '@prisma/client';

export function filterByMonths(shows: Array<Show>, currMonth: number) {
  if (!shows) return;

  return shows.filter(show => {
    if (new Date(show.showDate).getMonth() === currMonth) {
      return true;
    }
    return false;
  });
}
