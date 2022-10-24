import { atom } from 'jotai';
import produce from 'immer';
import {
  FormState,
  ReducerAction,
  HorsePayload,
  isHorsePayload,
  MemberPayload,
  isMemberPayload,
} from '@/types/atoms';
import { FormType, isFormType } from '@/types/common';

const costs = {
  Individual: 55,
  AnnualPerHorse: 25,
  Business: 65,
  Life: 500,
  LifePerHorse: 150,
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
    if (updateValue === 'Annual') {
      if (draft.type === 'Individual') draft.memberCost = costs[draft.type];

      if (draft.type === 'Business') draft.memberCost = costs[draft.type];
    }

    if (updateValue === 'Life') draft.memberCost = costs[updateValue];
  });
  set(formState, newState);
});

const updateHorseCost = atom(null, (get, set, updateValue: HorsePayload) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.horses = {
      lifeCost: updateValue.lifeCount * costs.LifePerHorse,
      annualCost: updateValue.annualCount * costs.AnnualPerHorse,
    };
  });

  console.log(newState);
  set(formState, newState);
});

const updateFormState = atom(null, (_get, set, action: ReducerAction) => {
  switch (action.type) {
    case 'FORMTYPE':
      isFormType(action.payload) && set(updateFormType, action.payload);
      break;
    case 'STATUS':
      isMemberPayload(action.payload) && set(updateSignupCost, action.payload);
      break;
    case 'HORSE':
      isHorsePayload(action.payload) && set(updateHorseCost, action.payload);
      break;
    case 'RESET':
      set(formState, initFormState);
      break;
    default:
      throw new Error('Unsupported action');
  }
});

export { formState, updateFormState };
