import { ChangeEvent, useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import _ from 'lodash';

import SteaJoinForm from '@/components/forms';
import { Radio } from '@/components/data-entry';
import { trpc } from '@/utils/trpc';

// TODO: Align Radio buttons and label properly

function JoinStea() {
  const [formType, setFormType] = useState<FormType>();
  const horseMutation = trpc.useMutation([
    'nonMemberHorseOwner.add-owner-horse',
  ]);

  const memberMutation = trpc.useMutation(['member.add-member']);

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

  function handleSubmit(formValues: FieldValues) {
    console.log(formValues);
    switch (formType) {
      case 'indivdual':
        formValues.member.fullName = `${formValues.member.firstName} ${formValues.member.lastName}`;
        memberMutation.mutate({
          member: formValues.member,
          horses: formValues.horses,
        });
        return;
      case 'horse':
        // TODO: Find better way to do this
        formValues.owner.fullName = `${formValues.firstName} ${formValues.lastName}`;

        horseMutation.mutate({
          horses: formValues.horses,
          owner: formValues.owner,
          combos: formValues.riderCombos,
        });
        return;
      case 'business':
        return;
    }
  }

  return (
    <div className='grid place-content-center h-full bg-opacity-50'>
      {!_.isUndefined(formType) ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
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
      ) : (
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

export default JoinStea;
