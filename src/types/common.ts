import { CSVEntry } from '@/server/utils';
import { ShowType } from '@prisma/client';
import { PropsWithChildren } from 'react';
import { typeToFlattenedError } from 'zod';

export const FORMTYPE = ['individual', 'business', 'horse'] as const;
export type FormType = (typeof FORMTYPE)[number];

export type ZodFieldErrors<T> = typeToFlattenedError<T, string>['fieldErrors'];
export function isZodFieldError<T>(
  o: ZodFieldErrors<T> | undefined,
): o is ZodFieldErrors<T> {
  return !!o;
}

export type EntriesRideType = Record<CSVEntry['rideType'], Array<CSVEntry>>;
export type EntriesRideTypeDivision = Record<
  CSVEntry['rideType'],
  Partial<Record<CSVEntry['division'], Array<CSVEntry>>>
>;

export type GroupedEntries = Record<
  CSVEntry['rideType'],
  Partial<
    Record<
      CSVEntry['division'],
      Partial<Record<CSVEntry['group'], Array<CSVEntry>>>
    >
  >
>;
export type PointsMap = Record<ShowType, Record<CSVEntry['placing'], number>>;

export type LayoutProps = PropsWithChildren;
