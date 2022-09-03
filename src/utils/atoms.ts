import { atom } from 'jotai';
import produce from 'immer';

interface FormState {
  selection: FormType;
  count: number;
}

const initFormState: FormState = {
  selection: undefined,
  count: 0,
};

// Full Form State
export const formState = atom(initFormState);

const inc = atom(null, (get, set) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.count += 1;
  });

  set(formState, newState);
});

const dec = atom(null, (get, set) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.count <= 0 ? 0 : (draft.count -= 1);
  });

  set(formState, newState);
});

export const updateFormSelection = atom(null, (get, set, selection: FormType) => {
  const prev = get(formState);
  const newState = produce(prev, draft => {
    draft.selection = selection; 
  });

  set(formState, newState);
});

export const updateFormState = atom(null, (_get, set, action: string) => {
  switch (action) {
    case 'ADD':
      set(inc);
      break;
    case 'REMOVE':
      set(dec);
      break;
    case 'RESET':
      set(formState, initFormState);
      break;
    default:
      throw new Error('Unsupported action');
  }
});
