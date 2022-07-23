import { ChangeEvent, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import _ from 'lodash';

import SteaJoinForm from '@/components/forms';
import { Radio } from '@/components/data-entry';

// TODO: Align Radio buttons and label properly

function IndivdualMember() {
  const [formType, setFormType] = useState<FormType>();

  const methods = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    // resolver: zodResolver(MemberModel),
    shouldUnregister: true,
  });

  if (!_.isEmpty(methods.formState.errors))
    console.log(methods.formState.errors);

  let radioVal: FormType | undefined = undefined;

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    radioVal = e.target.value as FormType;
  }

  if (!_.isUndefined(formType)) {
    return (
      <div className='grid place-content-center h-full bg-opacity-50'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(console.log)}>
            <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-8'>
              <button
                className='btn btn-link btn-sm self-end'
                onClick={() => setFormType(undefined)}
              >
                return
              </button>

              <SteaJoinForm formType={formType} />

              <button
                className='btn btn-primary mt-8'
                type='submit'
              >
                Finished
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    );
  }

  return (
    <div className='grid place-content-center h-full bg-opacity-50'>
      <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-8'>
        <button
          className='btn btn-primary w-full'
          value='mail'
        >
          Join by Mail
        </button>

        <h2 className='divider divider-vertical text-xl w-full self-center my-10'>
          Or...
        </h2>

        <h2 className='text-xl border-b-2 text-center'>Join Online Below</h2>

        <div className='card-body'>
          <h2>Membership Application type:</h2>
          <Radio
            label='Indivdual'
            className='radio radio-primary radio-sm'
            value='indivdual'
            onChange={handleRadioClick}
          />

          <Radio
            label='Family'
            className='radio radio-primary radio-sm'
            value='family'
            onChange={handleRadioClick}
          />

          <Radio
            label='Business'
            className='radio radio-primary radio-sm'
            value='business'
            onChange={handleRadioClick}
          />

          <Radio
            label='Horse'
            className='radio radio-primary radio-sm'
            value='horse'
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
    </div>
  );
}

export default IndivdualMember;
