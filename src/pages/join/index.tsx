import { ChangeEvent, ReactElement, useEffect} from 'react';
import { useAtom } from 'jotai';

import { PublicLayout } from '@/components/layout';
import SteaJoinForm from '@/components/forms';
import { Radio } from '@/components/data-entry';
import { formState, updateFormState, updateFormSelection} from '@/utils/atoms';

let radioVal: FormType;

function JoinStea() {
  const [state] = useAtom(formState);
  const [, update] = useAtom(updateFormState);
  const [, updateSelection] = useAtom(updateFormSelection);

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    radioVal = e.target.value as FormType;
  }

  // Reset atoms when leaving the join page
  // NOTE: Maybe a better way to accomplish this?
  useEffect(() => () => update('RESET'), []);

  return (
    <div className='grid place-content-center h-full bg-opacity-50'>
      {state.selection !== undefined ? (
        <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-8'>
          <button
            className='btn btn-link btn-sm self-end'
            onClick={() => update('RESET')}
          >
            return
          </button>

          <SteaJoinForm />
        </div>
      ) : (
        <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-8'>
          <h2 className='text-xl border-b-2 text-center'>Join Online Below</h2>

          <div className='card-body grid place-items-center'>
            <h2>Membership Application type:</h2>
            <div className='w-[75%]' onChange={handleRadioClick}>
              <Radio
                label='Individual'
                className='radio radio-primary radio-sm'
                value='individual'
                name='app-select'
              />

              <Radio
                label='Business'
                className='radio radio-primary radio-sm'
                value='business'
                name='app-select'
              />

              <Radio
                label='Horse'
                className='radio radio-primary radio-sm'
                value='horse'
                name='app-select'
              />
            </div>
          </div>

          <button
            className='btn btn-primary w-full'
            onClick={() => updateSelection(radioVal)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

JoinStea.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default JoinStea;
