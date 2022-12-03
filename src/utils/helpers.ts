import { SelectOption } from "@/components/data-entry/Select";
import { inferQueryOutput } from "./trpc";

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
