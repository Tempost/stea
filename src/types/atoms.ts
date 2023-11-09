import { Status } from '@prisma/client';
import { FormType } from './common';

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
  payload?: HorsePayload | Status | FormType;
}

export interface HorsePayload {
  lifeCount: number;
  annualCount: number;
}

export type MemberPayload = Status;

export type ValidDir = 'left' | 'right';

export interface MonthAction {
  dir: string;
}
