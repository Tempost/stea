import { atom } from 'jotai';
import produce from 'immer';
import {
  FormState,
  ReducerAction,
  HorsePayload,
  MemberPayload,
} from '@/types/atoms';
import { FormType } from '@/types/common';
import { EntryReviewType } from './zodschemas';
import type { Status } from '@prisma/client';

export const costs = {
  Life: {
    individual: 500,
    business: 500,
    horse: 150,
  },
  Annual: {
    individual: 55,
    business: 65,
    horse: 25,
  },
};

const initFormState: FormState = {
  type: undefined,
  memberCost: 0,
  horses: {
    lifeCost: 0,
    annualCost: 0,
  },
};

// Full Form State
const formState = atom(initFormState);

const updateFormType = atom(null, (get, set, updateValue: FormType) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.type = updateValue;
  });

  set(formState, newState);
});

const updateSignupCost = atom(null, (get, set, updateValue: MemberPayload) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.memberCost = draft.type ? costs[updateValue][draft.type] : 0;
  });
  set(formState, newState);
});

const updateHorseCost = atom(null, (get, set, updateValue: HorsePayload) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.horses = {
      lifeCost: updateValue.lifeCount * costs.Life.horse,
      annualCost: updateValue.annualCount * costs.Annual.horse,
    };
  });

  set(formState, newState);
});

const updateFormState = atom(null, (_get, set, action: ReducerAction) => {
  console.log(action);
  switch (action.type) {
    case 'FORMTYPE':
      set(updateFormType, action.payload as FormType);
      break;
    case 'STATUS':
      set(updateSignupCost, action.payload as Status);
      break;
    case 'HORSE':
      set(updateHorseCost, action.payload as HorsePayload);
      break;
    case 'RESET':
      set(formState, initFormState);
      break;
    default:
      throw new Error(`Unsupported action :: ${action.type}`);
  }
});

const ownerTypeAtom = atom('none');
const changeSelectionAtom = atom(
  get => get(ownerTypeAtom),
  (_get, set, newSelection: string) => set(ownerTypeAtom, newSelection)
);

const entryAtom = atom<Array<EntryReviewType> | undefined>(undefined);

export {
  formState,
  updateFormState,
  changeSelectionAtom,
  ownerTypeAtom,
  entryAtom,
};
