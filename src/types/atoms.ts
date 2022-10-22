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
  payload?: HorsePayload | Status | FormType | Type;
}

export interface HorsePayload {
  lifeCount: number;
  annualCount: number;
}

export type MemberPayload = Type | Status;

export function isHorsePayload(o: any): o is HorsePayload {
  return o?.lifeCount !== undefined;
}

export function isMemberPayload(o: any): o is Type | Status {
  return TYPE.includes(o) || STATUS.includes(o);
}

export function isSignUpType(o: any): o is Type {
  return TYPE.includes(o);
}
