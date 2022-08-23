import { ChangeEvent, useState } from 'react';

import { PublicLayout } from '@/components/layout';
import SteaJoinForm from '@/components/forms';
import { Radio } from '@/components/data-entry';

// TODO: Align Radio buttons and label properly

function JoinStea() {
  const [formType, setFormType] = useState<FormType>();

  let radioVal: FormType | undefined = undefined;

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    radioVal = e.target.value as FormType;
  }

  return (
    <div className='grid place-content-center h-full bg-opacity-50'>
      {formType !== undefined ? (
        <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-8'>
          <button
            className='btn btn-link btn-sm self-end'
            onClick={() => setFormType(undefined)}
          >
            return
          </button>

          <SteaJoinForm formType={formType} />
        </div>
      ) : (
        <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-8'>
          <h2 className='text-xl border-b-2 text-center'>Join Online Below</h2>

          <div className='card-body'>
            <h2>Membership Application type:</h2>
            <Radio
              label='Individual'
              className='radio radio-primary radio-sm'
              value='individual'
              name='app-select'
              onChange={handleRadioClick}
            />

            <Radio
              label='Business'
              className='radio radio-primary radio-sm'
              value='business'
              name='app-select'
              onChange={handleRadioClick}
            />

            <Radio
              label='Horse'
              className='radio radio-primary radio-sm'
              value='horse'
              name='app-select'
              onChange={handleRadioClick}
            />
          </div>

          <button
            className='btn btn-primary w-full'
            onClick={() => setFormType(radioVal)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
import { ReactElement } from 'react';
JoinStea.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default JoinStea;
