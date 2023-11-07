import { Status, Type } from '@prisma/client';
import { FormType, STATUS, TYPE } from './common';

export interface FormState {
  type: FormType | undefined;
  memberCost: number;
  horses: {
    lifeCost: number;
    annualCost: number;
  };
}

export interface ReducerAction {
  type: 'RESET' | 'FORMTYPE' | 'HORSE' | 'SIGNUPTYPE' | 'STATUS';
  payload?: HorsePayload | Status;
}

export interface HorsePayload {
  lifeCount: number;
  annualCount: number;
}

export type MemberPayload = Status;

export type ValidDir = 'left' | 'right';

export interface MonthAction {
  dir: ValidDir;
}

const ownerType = ['none', 'member', 'non-member'] as const;
export type OwnerType = (typeof ownerType)[number];
export function isOwnerType(o: any): o is OwnerType {
  return ownerType.includes(o);
}

export function isHorsePayload(o: any): o is HorsePayload {
  return o?.lifeCount !== undefined;
}

export function isMemberPayload(o: any): o is Type | Status {
  return STATUS.includes(o);
}

export function isSignUpType(o: any): o is Type {
  return TYPE.includes(o);
}

export function isValidDir(dir: any): dir is ValidDir {
  return dir === 'left' || dir === 'right';
}
