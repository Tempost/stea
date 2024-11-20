import { ChangeEvent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useAtomValue, useSetAtom } from 'jotai';

import { FormLayout } from '@/components/layout/FormLayout';
import Radio from '@/components/styled-ui/Radio';
import { formState, updateFormState } from '@/utils/atoms';
import { FormType } from '@/types/common';

const radioSelections = ['Individual', 'Business', 'Horse'];

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
        <h3>Membership Application type:</h3>
        <div onChange={handleRadioClick}>
          {radioSelections.map(selection => (
            <div
              key={selection}
              className='form-control flex-row'
            >
              <label
                htmlFor={`${selection}-id`}
                aria-label={selection}
                className='label cursor-pointer space-x-10'
                key={selection}
              >
                <Radio
                  id={`${selection}-id`}
                  className='radio radio-primary radio-md md:radio-sm'
                  value={selection}
                  name='app-select'
                />
                <span className='label-text'>{selection}</span>
              </label>
            </div>
          ))}
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
