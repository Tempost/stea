import { Status } from '@prisma/client';

export const FORMTYPE = ['Individual', 'Business', 'Horse'] as const;
export type FormType = typeof FORMTYPE[number];

export const STATUS = ['Life', 'Annual', 'Renew'] as const;
export type Statuskey = typeof STATUS[number];

export const TYPE = ['Individual', 'Business'] as const;
export type TypeKey = typeof TYPE[number];

export type Option<T> = T | undefined;

export function isStatus(o: any): o is Status {
  return STATUS.includes(o as Status);
}

export function isFormType(o: any): o is FormType {
  return FORMTYPE.includes(o as FormType);
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
