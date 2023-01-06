import { SelectOption } from '@/components/data-entry/Select';
import { RouterOutputs } from './trpc';

export function removeUndefined<T>(data: (T | undefined)[]) {
  return data.filter((item: any): item is T => item !== undefined);
}

export function readableDateTime(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function createSelectOpts(
  shows: RouterOutputs['shows']['all']
): SelectOption[] {
  if (shows.length === 0) {
    return [{ value: '', label: 'No Shows' }];
  }
  return shows.map(show => {
    return {
      value: show.uid,
      label: `${show.showName} (${readableDateTime(show.showDate)})`,
    };
  });
}

export function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
