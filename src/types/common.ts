import { Entry } from '@/server/utils';
import { Division, ShowType, Status } from '@prisma/client';
import { typeToFlattenedError } from 'zod';

export class ParseError extends Error {}

export const FORMTYPE = ['Individual', 'Business', 'Horse'] as const;
export type FormType = (typeof FORMTYPE)[number];
export function isFormType(o: any): o is FormType {
  return FORMTYPE.includes(o as FormType);
}

export const STATUS = ['Life', 'Annual', 'Renew'] as const;
export type Statuskey = (typeof STATUS)[number];
export function isStatus(o: any): o is Status {
  return STATUS.includes(o as Status);
}

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
] as const;

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
} as const;

export type UnMappedHeaderNames = typeof HEADER_NAMES;
export type MappedHeaderNames = typeof KEY_NAMES;
export function isHeadingNames(a: ReadonlyArray<any>): a is UnMappedHeaderNames {
  return a.every((val) => HEADER_NAMES.includes(val));
}

export const isEntry = (o: Entry | undefined): o is Entry => {
  return !!o;
};

export type ZodFieldErrors<T> = typeToFlattenedError<T, string>['fieldErrors'];
export function isZodFieldError<T>(
  o: ZodFieldErrors<T> | undefined
): o is ZodFieldErrors<T> {
  return !!o;
}

export type UploadPointsQueryParams = { showUID: string };
export function isShowUniqueArgs(o: any): o is UploadPointsQueryParams {
  return o?.showUID !== undefined;
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
export interface EntryReview {
  fullName: string;
  horseRN: string;
  division: Division;
  countInDivision: number;
  rideType: ShowType;
  place: Entry['placing'];
  points: number;
}

export type LayoutProps = React.PropsWithChildren;
export interface HeaderProps extends React.PropsWithChildren {}
