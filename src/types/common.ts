import { CSVEntry } from '@/server/utils';
import { ShowType } from '@prisma/client';
import { useForm, Validator } from '@tanstack/react-form';
import { PropsWithChildren } from 'react';
import { typeToFlattenedError } from 'zod';

export const FORMTYPE = ['individual', 'business', 'horse'] as const;
export type FormType = (typeof FORMTYPE)[number];

export type ZodFieldErrors<T> = typeToFlattenedError<T, string>['fieldErrors'];
export function isZodFieldError<T>(
  o: ZodFieldErrors<T> | undefined
): o is ZodFieldErrors<T> {
  return !!o;
}

export type EntriesRideType = Record<CSVEntry['rideType'], Array<CSVEntry>>;
export type EntriesRideTypeDivison = Record<
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

export type FormReturnType<TForm, TFormValidator> = TFormValidator extends
  | Validator<TForm, unknown>
  | undefined
  ? ReturnType<typeof useForm<TForm, TFormValidator>>
  : never;
