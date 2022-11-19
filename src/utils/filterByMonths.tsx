import { inferQueryOutput } from '@/utils/trpc';

export function filterByMonths(
    shows: inferQueryOutput<'shows.get-shows'> | undefined,
    currMonth: number) {
    if (!shows)
        return;

    return shows.filter(show => {
        if (show.showDate.getMonth() === currMonth) {
            return true;
        }
        return false;
    });
}

