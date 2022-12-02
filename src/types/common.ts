import { Entry } from '@/utils/zodschemas';
import { Status } from '@prisma/client';
import { typeToFlattenedError, ZodError } from 'zod';

export const FORMTYPE = ['Individual', 'Business', 'Horse'] as const;
export type FormType = typeof FORMTYPE[number];
export function isFormType(o: any): o is FormType {
  return FORMTYPE.includes(o as FormType);
}

export const STATUS = ['Life', 'Annual', 'Renew'] as const;
export type Statuskey = typeof STATUS[number];
export function isStatus(o: any): o is Status {
  return STATUS.includes(o as Status);
}

export const TYPE = ['Individual', 'Business'] as const;
export type TypeKey = typeof TYPE[number];

export type Option<T> = T | undefined;

export const HEADER_NAMES = {
  'Rider First Name': 'firstName',
  'Rider Last Name': 'lastName',
  'Horse Name': 'horseName',
  'HT/CT/Derby': 'showType',
  Division: 'division',
  Group: 'group',
  'Final Score': 'finalScore',
  Placing: 'placing',
} as const;

export type UnMappedHeaderNames = keyof typeof HEADER_NAMES;
export type MappedHeaderNames = typeof HEADER_NAMES[UnMappedHeaderNames];
export function isHeadingNames(a: any[]): a is UnMappedHeaderNames[] {
  return a.every(a => a in HEADER_NAMES);
}

export const isEntry = (o: Entry | undefined): o is Entry => {
  return !!o;
};

export type ZodFieldErrors<T> = typeToFlattenedError<T, string>['fieldErrors'];
export function isZodFielError<T>(o: ZodFieldErrors<T> | undefined):o is ZodFieldErrors<T> {
  return !!o;
}

export const Divisions = {
  Prelim: 'Prelim',
  Train: 'Train',
  Novice: 'Novice',
  BGN: 'BGN',
  GOLD: 'GOLD',
  GAG: 'GAG',
};
export type Divisions = typeof Divisions[keyof typeof Divisions];

export type LayoutProps = React.PropsWithChildren;
export interface HeaderProps extends React.PropsWithChildren {}
