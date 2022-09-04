import { atom } from 'jotai';
import produce from 'immer';
import {
  FormState,
  ReducerAction,
  HorsePayload,
  isHorsePayload,
  isSignUpType,
} from '@/types/atoms';
import { Status, Type } from '@prisma/client';
import { FormType, isFormType, isStatus } from '@/types/common';

const initFormState: FormState = {
  member: {
    type: undefined,
    status: undefined,
  },
  horses: {
    lifeCount: 0,
    annualCount: 0,
  },
};

// Full Form State
const formState = atom(initFormState);

const updateFormType = atom(null, (get, set, updateValue: FormType) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.type = updateValue;
  });

  console.log(newState);
  set(formState, newState);
});

const updateSignUp = atom(null, (get, set, updateValue: Type) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.member.type = updateValue;
  });

  set(formState, newState);
});

const updateStatus = atom(null, (get, set, updateValue: Status) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.member.status = updateValue;
  });

  set(formState, newState);
});

const updateHorseCount = atom(null, (get, set, updateValue: HorsePayload) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.horses = updateValue;
  });

  set(formState, newState);
});

const updateFormState = atom(null, (_get, set, action: ReducerAction) => {
  console.log(action);
  switch (action.type) {
    case 'FORMTYPE':
      isFormType(action.payload) && set(updateFormType, action.payload);
      break;
    case 'SIGNUPTYPE':
      isSignUpType(action.payload) && set(updateSignUp, action.payload);
      break;
    case 'STATUS':
      isStatus(action.payload) && set(updateStatus, action.payload);
      break;
    case 'HORSE':
      isHorsePayload(action.payload) && set(updateHorseCount, action.payload);
      break;
    case 'RESET':
      set(formState, initFormState);
      break;
    default:
      throw new Error('Unsupported action');
  }
});

export { formState, updateFormState };
