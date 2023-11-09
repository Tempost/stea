import { atom } from 'jotai';
// TODO: Replace with jotai-immer ?
import produce from 'immer';
import {
  FormState,
  ReducerAction,
  HorsePayload,
  MemberPayload,
  MonthAction,
} from '@/types/atoms';
import { FormType } from '@/types/common';
import { EntryReviewType } from './zodschemas';

export const costs = {
  Life: {
    Individual: 500,
    Business: 500,
    Horse: 150,
  },
  Annual: {
    Individual: 55,
    Business: 65,
    Horse: 25,
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
      lifeCost: updateValue.lifeCount * costs.Life.Horse,
      annualCost: updateValue.annualCount * costs.Annual.Horse,
    };
  });

  set(formState, newState);
});

const updateFormState = atom(null, (_get, set, action: ReducerAction) => {
  console.log(action);
  switch (action.type) {
    case 'FORMTYPE':
      set(updateFormType, action.payload);
      break;
    case 'STATUS':
      set(updateSignupCost, action.payload);
      break;
    case 'HORSE':
      set(updateHorseCost, action.payload);
      break;
    case 'RESET':
      set(formState, initFormState);
      break;
    default:
      throw new Error(`Unsupported action :: ${action.type}`);
  }
});

const currMonth = new Date().getMonth();
const month = atom(currMonth);
const selectedMonth = atom(get => get(month));

const incMonth = atom(null, (_get, set) => {
  set(month, prev => (prev + 1) % 12);
});

const decMonth = atom(null, (_get, set) => {
  // Goofy math to prevent negative value in return
  // happens with the the modulus is negative
  // -a % b <-- required ((-a % b) + b)a % b
  // to get positive return value
  set(month, prev => (((prev - 1) % 12) + 12) % 12);
});

const changeMonth = atom(null, (_get, set, action: MonthAction) => {
  switch (action.dir) {
    case 'left':
      set(decMonth);
      break;
    case 'right':
      set(incMonth);
      break;
    default:
      throw new Error(`Unsupported action :: action:${action.dir}`);
  }
});

const ownerTypeAtom = atom('none');
const changeSelectionAtom = atom(
  get => get(ownerTypeAtom),
  (_get, set, newSelection: string) => set(ownerTypeAtom, newSelection)
);

const entryAtom = atom<EntryReviewType[] | undefined>(undefined);

export {
  formState,
  updateFormState,
  selectedMonth,
  changeMonth,
  changeSelectionAtom,
  ownerTypeAtom,
  entryAtom,
};
