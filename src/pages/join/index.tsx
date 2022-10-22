import { ChangeEvent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useAtomValue, useSetAtom } from 'jotai';

import { FormLayout } from '@/components/layout';
import { Radio } from '@/components/data-entry';
import { formState, updateFormState } from '@/utils/atoms';
import { FormType } from '@/types/common';

function JoinStea() {
  const update = useSetAtom(updateFormState);
  const state = useAtomValue(formState);

  const router = useRouter();

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    update({ type: 'FORMTYPE', payload: e.target.value as FormType });
  }

  return (
    <section>
      <h2 className='border-b-2 text-center text-2xl'>Join Online Below</h2>
      <div className='card-body grid place-items-center'>
        <h2>Membership Application type:</h2>
        <div
          className='w-[75%]'
          onChange={handleRadioClick}
        >
          <Radio
            label='Individual'
            className='radio radio-primary radio-md md:radio-sm'
            value='Individual'
            name='app-select'
          />

          <Radio
            label='Business'
            className='radio radio-primary radio-md md:radio-sm'
            value='Business'
            name='app-select'
          />

          <Radio
            label='Horse'
            className='radio radio-primary radio-md md:radio-sm'
            value='Horse'
            name='app-select'
          />
        </div>
      </div>

      <button
        className='btn btn-primary w-full'
        onClick={() => {
          if (state.type) {
            router.push(`${router.pathname}/form/${state.type?.toLowerCase()}`);
          }
        }}
      >
        Next
      </button>
    </section>
  );
}

JoinStea.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default JoinStea;
