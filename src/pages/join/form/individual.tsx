import { ReactElement } from 'react';
import { z } from 'zod';
import { FieldValues, FormProvider, useFormState } from 'react-hook-form';

import {
  Checkbox,
  TextInput,
  Select,
  NumericInput,
} from '@/components/data-entry';

import { HorseModel, MemberModel } from '@/backend/prisma/zod';
import JRSR from '@/components/forms/JRSRField';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { trpc } from '@/utils/trpc';
import { HorseFieldArray } from '@/components/forms/fieldarrayfields';

import { Type, Horse } from '@prisma/client';
import RegType from '@/components/forms/regtype';
import { useSetAtom } from 'jotai';
import { updateFormState } from '@/utils/atoms';
import { FormLayout } from '@/components/layout';
import Payment from './payment';

const phoneTypes = [
  {
    label: 'mobile',
    value: 'Mobile',
  },
  {
    label: 'home',
    value: 'Home',
  },
  {
    label: 'business',
    value: 'Business',
  },
];

const MemberFormValues = z.object({
  member: MemberModel,
  horseReg: z.boolean(),
  horses: z.array(HorseModel).optional(),
});

function IndividualRegistration() {
  const memberMutation = trpc.useMutation(['member.add-member']);
  const update = useSetAtom(updateFormState);

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: MemberFormValues,
  });

  const { setValue, watch, register, handleSubmit, control } = methods;

  const inputState = useFormState({ control });

  const isUSEAMember = watch('member.currentUSEAMember', false);
  const isUnder18 = watch('member.JRSR', 'SR');
  const isRegHorse = watch('horseReg', false);

  const finishButtonStyles = `
    btn
    btn-primary
    ${memberMutation.isSuccess && 'btn-success'}
    ${memberMutation.isError && 'btn-error'}
    mt-8
    w-full
  `;

  function onSumbit(formValues: FieldValues) {
    // TODO: Move adding to the DB via the payment screen
    // memberMutation.mutate({
    //   member: formValues.member,
    //   horses: formValues.horses,
    // });
  }

  function triggerValidation() {
    const formValues = methods.getValues();

    methods.setValue(
      'member.fullName',
      `${formValues.member.firstName} ${formValues.member.lastName}`
    );

    methods.trigger().then(() => {
      if (formValues.horses !== undefined) {
        const lifeCount = formValues.horses.filter(
          horse => horse.regType === 'Life'
        ).length;

        const annualCount = formValues.horses.filter(
          horse => horse.regType === 'Annual'
        ).length;

        update({
          type: 'HORSE',
          payload: { lifeCount: lifeCount, annualCount: annualCount },
        });
      }
    });
  }

  setValue('member.memberType', 'Individual' as Type);
  setValue('member.boardMember', false);
  setValue('member.confirmed', false);
  console.log(methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <h2 className='divider'>Individual Membership</h2>

        <div className='flex gap-5'>
          <TextInput
            inputMode='text'
            label='First Name*'
            className='input-sm input-primary input-primary'
            error={inputState.errors.member?.firstName}
            {...register('member.firstName', { required: true })}
          />

          <TextInput
            inputMode='text'
            label='Last Name*'
            className='input-sm input-primary'
            error={inputState.errors.member?.lastName}
            {...register('member.lastName', { required: true })}
          />
        </div>

        <h3 className='mt-3'>Address*</h3>
        <div className='flex flex-col gap-2'>
          <TextInput
            inputMode='text'
            className='input-sm input-primary'
            placeholder='Address Line 1'
            error={inputState.errors.member?.address}
            {...register('member.address', { required: true })}
          />

          <TextInput
            inputMode='text'
            className='input-sm input-primary'
            placeholder='Address Line 2'
            name='temp'
          />

          <div className='flex gap-1'>
            <TextInput
              inputMode='text'
              className='input-sm input-primary'
              placeholder='City'
              error={inputState.errors.member?.city}
              {...register('member.city', { required: true })}
            />

            <Select
              className='select-sm select-primary'
              error={inputState.errors.member?.state}
              options={states}
              {...register('member.state', { required: true })}
            />

            <NumericInput
              inputMode='numeric'
              className='input-sm input-primary'
              placeholder='Zip Code'
              inputSize='w-fit'
              error={inputState.errors.member?.zip}
              {...register('member.zip', {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Select
                label='Phone Type*'
                className='select-sm select-primary'
                options={phoneTypes}
                {...register('member.phoneType', { required: true })}
              />

              <TextInput
                label='Phone Number*'
                inputMode='tel'
                className='input-sm input-primary'
                error={inputState.errors.member?.phone}
                {...register('member.phone', { required: true })}
              />
            </div>

            <TextInput
              label='Email*'
              inputMode='text'
              className='input-sm input-primary'
              altLabel={
                'This will the primary method of contact, ensure it is up to date!'
              }
              error={inputState.errors.member?.email}
              {...register('member.email', { required: true })}
            />
          </div>

          <RegType
            register={register('member.memberStatus', { required: true })}
          />

          <JRSR
            radioRegister={register('member.JRSR', { required: true })}
            dateRegister={register('member.dateOfBirth', {
              required: isUnder18,
            })}
            watch={isUnder18}
          />

          <div className='flex gap-2'>
            <Checkbox
              label='Current USEA Member?'
              className='checkbox checkbox-primary checkbox-sm'
              {...register('member.currentUSEAMember')}
            />

            {isUSEAMember && (
              <NumericInput
                inputMode='text'
                className='input-sm input-primary'
                placeholder='USEA Member ID'
                inputSize='w-50'
                error={inputState.errors.member?.useaMemberID}
                {...register('member.useaMemberID', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            )}
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            className='checkbox checkbox-primary checkbox-sm'
            {...register('horseReg')}
          />

          {isRegHorse && <HorseFieldArray />}
        </div>

        {methods.formState.isValid ? (
          <Payment />
        ) : (
          <button
            type='button'
            className={finishButtonStyles}
            onClick={() => triggerValidation()}
          >
            Move to payment
          </button>
        )}
      </form>
    </FormProvider>
  );
}

IndividualRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default IndividualRegistration;
