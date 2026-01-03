import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function removeUndefined<T>(data: Array<T | undefined>) {
  return data.filter((item: T | undefined): item is T => item !== undefined);
}

export function readableDateTime(date: string | Date | null) {
  if (!date) {
    return 'N/A';
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
}

export function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}
