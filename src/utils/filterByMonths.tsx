import { RouterOutputs } from '@/utils/trpc';

export function filterByMonths(
  shows: RouterOutputs['shows']['all'] | undefined,
  currMonth: number
) {
  if (!shows) return;

  return shows.filter(show => {
    if (show.showDate.getMonth() === currMonth) {
      return true;
    }
    return false;
  });
}
