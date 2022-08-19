import { z } from 'zod';
import { FieldValues, FormProvider, useFormState } from 'react-hook-form';

import {
  Radio,
  Checkbox,
  TextInput,
  Select,
  NumericInput,
} from '@/components/data-entry';

import { HorseModel, MemberModel } from '@/backend/prisma/zod';
import JRSR from './JRSRField';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { trpc } from '@/utils/trpc';
import { HorseFieldArray } from './fieldarrayfields';

import { Type } from '@prisma/client';

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
  member: MemberModel.omit({ fullName: true }),
  horseReg: z.boolean(),
  horses: z.array(HorseModel).optional(),
});

function IndividualRegistration() {
  const memberMutation = trpc.useMutation(['member.add-member']);

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: MemberFormValues,
  });

  const { setValue, watch, register, handleSubmit, control } = methods;

  const formState = useFormState({ control });

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
    formValues.member.fullName = `${formValues.member.firstName} ${formValues.member.lastName}`;

    memberMutation.mutate({
      member: formValues.member,
      horses: formValues.horses,
    });
  }

  setValue('member.memberType', 'Individual' as Type);
  setValue('member.boardMember', false);
  setValue('member.confirmed', false);

  formState.errors &&
    formState.isDirty &&
    console.log(formState.errors, formState.dirtyFields);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <h2 className='divider'>Individual Membership</h2>

        <div className='flex gap-5'>
          <TextInput
            inputMode='text'
            label='First Name*'
            className='input-sm input-primary input-primary'
            error={formState.errors.member?.firstName}
            {...register('member.firstName', { required: true })}
          />

          <TextInput
            inputMode='text'
            label='Last Name*'
            className='input-sm input-primary'
            error={formState.errors.member?.lastName}
            {...register('member.lastName', { required: true })}
          />
        </div>

        <JRSR
          register={[register('member.JRSR')]}
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
              {...register('member.useaMemberID', {
                required: isUSEAMember,
                valueAsNumber: true,
              })}
            />
          )}
        </div>

        <h3>Address*</h3>
        <div className='flex flex-col gap-2'>
          <TextInput
            inputMode='text'
            className='input-sm input-primary'
            placeholder='Address Line 1'
            error={formState.errors.member?.address}
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
              error={formState.errors.member?.city}
              {...register('member.city', { required: true })}
            />

            <Select
              className='select-sm select-primary'
              options={states}
              {...register('member.state', { required: true })}
            />

            <NumericInput
              inputMode='numeric'
              className='input-sm input-primary'
              placeholder='Zip Code'
              inputSize='w-fit'
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
                error={formState.errors.member?.phone}
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
              error={formState.errors.member?.email}
              {...register('member.email', { required: true })}
            />
          </div>

          <h3>Registration Type*</h3>
          <div className='flex gap-5'>
            <Radio
              label='Annual'
              value='Annual'
              className='radio radio-primary radio-sm'
              {...register('member.memberStatus', { required: true })}
            />

            <Radio
              label='Life'
              value='Life'
              className='radio radio-primary radio-sm'
              {...register('member.memberStatus', { required: true })}
            />
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            className='checkbox checkbox-primary checkbox-sm'
            {...register('horseReg')}
          />

          {isRegHorse && <HorseFieldArray />}
        </div>

        <button
          className={finishButtonStyles}
          type='submit'
        >
          Finished
        </button>
      </form>
    </FormProvider>
  );
}

export default IndividualRegistration;
