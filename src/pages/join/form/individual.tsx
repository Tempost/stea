import { ReactElement, useState } from 'react';
import { FormProvider, useFormState } from 'react-hook-form';
import { useSetAtom } from 'jotai';

import {
  Checkbox,
  TextInput,
  Select,
  NumericInput,
} from '@/components/data-entry';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { Type } from '@prisma/client';
import {
  RegType,
  MemberType,
  HorseFieldArray,
  Payment,
  Under18,
} from '@/components/forms';
import { FormLayout } from '@/components/layout';
import phoneTypes from '@/utils/phoneTypes.json';
import { MemberFormValues } from '@/utils/zodschemas';
import { updateFormState } from '@/utils/atoms';
import { trpc } from '@/utils/trpc';

function IndividualRegistration() {
  const [payment, togglePayment] = useState(false);

  const checkMember = trpc.members.exists.useMutation({
    onSuccess() {
      togglePayment(true);
    },
  });

  const insert = trpc.members.add.useMutation();

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormValues,
  });

  const { setValue, watch, register, control } = methods;

  const inputState = useFormState({ control });

  const isUSEAMember = watch('member.currentUSEAMember', false);
  const isRegHorse = watch('horseReg', false);
  const update = useSetAtom(updateFormState);

  setValue('member.memberType', 'Individual' as Type);

  function onSubmit(formValues: MemberFormValues) {
    if (formValues.horses) {
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

    checkMember.mutate(formValues);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Payment
          showPayment={payment}
          formMutation={{
            error: checkMember.isError,
            message: checkMember.error?.message,
            mutateFn: () => insert.mutate(methods.getValues()),
          }}
        >
          <h2 className='divider'>Individual Membership</h2>

          <div className='flex gap-1 md:gap-5'>
            <TextInput
              inputMode='text'
              label='First Name*'
              className='input-primary'
              error={inputState.errors.member?.firstName}
              {...register('member.firstName', { required: true })}
            />

            <TextInput
              inputMode='text'
              label='Last Name*'
              className='input-primary'
              error={inputState.errors.member?.lastName}
              {...register('member.lastName', { required: true })}
            />
          </div>

          <h3 className='mt-3 pb-2 text-sm'>Address*</h3>
          <div className='flex flex-col gap-2'>
            <TextInput
              inputMode='text'
              className='input-primary'
              placeholder='Address Line 1'
              error={inputState.errors.member?.address}
              {...register('member.address', { required: true })}
            />

            <TextInput
              inputMode='text'
              className='input-primary'
              placeholder='Address Line 2'
              name='temp'
            />

            <div className='flex flex-col gap-1 md:flex-row'>
              <TextInput
                inputMode='text'
                className='input-primary w-full'
                placeholder='City'
                error={inputState.errors.member?.city}
                {...register('member.city', { required: true })}
              />

              <Select
                className='select-primary w-full lg:w-fit'
                error={inputState.errors.member?.state}
                options={states}
                {...register('member.state', { required: true })}
              />

              <NumericInput
                inputMode='numeric'
                className='input-primary'
                placeholder='Zip Code'
                inputSize='w-full lg:w-fit'
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
                  className='select-primary'
                  options={phoneTypes}
                  {...register('member.phoneType', { required: true })}
                />

                <TextInput
                  label='Phone Number*'
                  inputMode='tel'
                  className='input-primary'
                  error={inputState.errors.member?.phone}
                  {...register('member.phone', { required: true })}
                />
              </div>

              <TextInput
                label='Email*'
                inputMode='text'
                className='input-primary'
                altLabel={'This will be the primary method of contact.'}
                error={inputState.errors.member?.email}
                {...register('member.email', { required: true })}
              />
            </div>

            <div className='container flex-col'>
              <RegType
                register={register('member.memberStatus', { required: true })}
                formType='Individual'
              />

              <MemberType register={register('member.memberStatusType')} />

              <Under18 dateName='member.dateOfBirth' />
            </div>

            <div className='flex gap-2'>
              <Checkbox
                label='Current USEA Member?'
                {...register('member.currentUSEAMember')}
              />

              {isUSEAMember && (
                <NumericInput
                  inputMode='text'
                  className='input-primary'
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
              {...register('horseReg')}
            />

            {isRegHorse && <HorseFieldArray />}
          </div>
        </Payment>
      </form>
    </FormProvider>
  );
}

IndividualRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default IndividualRegistration;
