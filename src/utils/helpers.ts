import { SelectOption } from '@/components/data-entry/Select';
import { inferQueryOutput } from './trpc';

export function removeUndefined<T>(data: (T | undefined)[]) {
  return data.filter((item: any): item is T => item !== undefined);
}

export function readableDateTime(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function createSelectOpts(
  shows: inferQueryOutput<'shows.get-shows'>
): SelectOption[] {
  return shows.map(show => {
    return {
      value: show.uid,
      label: `${show.showName} (${readableDateTime(show.showDate)})`,
    };
  });
}

export function groupBy<TObj>(arr: TObj[], fn: (item: TObj) => any) {
  return arr.reduce<Record<string, TObj[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}

export function groupByFunc<
  RetType extends PropertyKey,
  T, // no longer need any requirements on T since the grouper can do w/e it wants
  Func extends (arg: T) => RetType
>(arr: T[], mapper: Func): Record<RetType, T[]> {
  return arr.reduce((accumulator, val) => {
    const groupedKey = mapper(val);
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as Record<RetType, T[]>);
}

// Get Keys and assert correct key types instead of just string
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;
