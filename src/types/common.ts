import { Entry } from '@/server/utils';
import { ShowType } from '@prisma/client';
import { PropsWithChildren } from 'react';
import { typeToFlattenedError } from 'zod';

export class ParseError extends Error {}

export const FORMTYPE = ['Individual', 'Business', 'Horse'] as const;
export type FormType = (typeof FORMTYPE)[number];

export const STATUS = ['Life', 'Annual', 'Renew'] as const;
export type Statuskey = (typeof STATUS)[number];

export const TYPE = ['Individual', 'Business'] as const;
export type TypeKey = (typeof TYPE)[number];

export type Option<T> = T | undefined;

export const HEADER_NAMES = [
  'Rider First Name',
  'Rider Last Name',
  'Horse Name',
  'HT/CT/Derby',
  'Division',
  'Group',
  'Final Score',
  'Placing',
];

export const KEY_NAMES = [
  'firstName',
  'lastName',
  'horseName',
  'rideType',
  'division',
  'group',
  'finalScore',
  'placing',
] as const;

export const HEADER_MAPPING = {
  'Rider First Name': 'firstName',
  'Rider Last Name': 'lastName',
  'Horse Name': 'horseName',
  'HT/CT/Derby': 'rideType',
  Division: 'division',
  Group: 'group',
  'Final Score': 'finalScore',
  Placing: 'placing',
};

export type UnMappedHeaderNames = typeof HEADER_NAMES;
export type MappedHeaderNames = typeof KEY_NAMES;

export const isEntry = (o: Entry | undefined): o is Entry => {
  return !!o;
};

export type ZodFieldErrors<T> = typeToFlattenedError<T, string>['fieldErrors'];
export function isZodFieldError<T>(
  o: ZodFieldErrors<T> | undefined
): o is ZodFieldErrors<T> {
  return !!o;
}

export type EntriesRideType = Record<Entry['rideType'], Entry[]>;
export type EntriesRideTypeDivison = Record<
  Entry['rideType'],
  Partial<Record<Entry['division'], Entry[]>>
>;

export type GroupedEntries = Record<
  Entry['rideType'],
  Partial<Record<Entry['division'], Partial<Record<Entry['group'], Entry[]>>>>
>;
export type PointsMap = Record<ShowType, Record<Entry['placing'], number>>;

export type LayoutProps = PropsWithChildren;
export interface HeaderProps extends PropsWithChildren {}
