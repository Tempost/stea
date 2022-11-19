import { ReactElement, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSetAtom } from 'jotai';

import {
  TextInput,
  Select,
  NumericInput,
  Checkbox,
} from '@/components/data-entry';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { HorseFieldArray, RegType, Payment } from '@/components/forms';
import { FormLayout } from '@/components/layout';
import { Type } from '@prisma/client';
import phoneTypes from '@/utils/phoneTypes.json';
import { MemberFormValues } from '@/utils/zodschemas';
import { updateFormState } from '@/utils/atoms';
import { trpc } from '@/utils/trpc';

function BusinessRegistration() {
  const [payment, togglePayment] = useState(false);
  const checkMember = trpc.useMutation(['member.exists'], {
    onSuccess() {
      togglePayment(true);
    },
  });

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormValues,
  });
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const isRegHorse = watch('horseReg', false);
  const update = useSetAtom(updateFormState);

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

  setValue('member.memberType', 'Business' as Type);
  setValue('member.memberStatusType', 'Professional');
  setValue('member.currentUSEAMember', false);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Payment
          showPayment={payment}
          query={{
            error: checkMember.isError,
            message: checkMember.error?.message,
            mutation: 'member.add-member',
          }}
        >
          <h2 className='divider'>Business Registration</h2>

          <h3 className='mb-2 rounded-2xl border border-solid border-gray-400 bg-gray-100 p-4 text-center'>
            As part of the membership you can submit
            <br />
            your company logo for our home page!
            <br />
            Submit to stea@stevening.net
          </h3>

          <div className='flex flex-col gap-2'>
            <h3 className='text-sm'>Name of Business*</h3>
            <TextInput
              inputMode='text'
              className='input-primary input-sm'
              error={errors.member?.businessName}
              {...register('member.businessName', { required: true })}
            />

            <h3 className='text-sm'>Business Address*</h3>
            <div className='flex flex-col gap-2'>
              <TextInput
                inputMode='text'
                className='input-primary input-sm'
                placeholder='Address Line 1'
                error={errors.member?.address}
                {...register('member.address', { required: true })}
              />

              <TextInput
                inputMode='text'
                className='input-primary input-sm'
                placeholder='Address Line 2'
                name='temp'
              />

              <div className='flex gap-1'>
                <TextInput
                  inputMode='text'
                  className='input-primary input-sm'
                  placeholder='City'
                  error={errors.member?.city}
                  {...register('member.city', { required: true })}
                />

                <Select
                  className='select-primary select-sm'
                  options={states}
                  error={errors.member?.state}
                  {...register('member.state', { required: true })}
                />

                <NumericInput
                  inputMode='numeric'
                  className='input-primary input-sm'
                  placeholder='Zip Code'
                  inputSize='w-fit'
                  error={errors.member?.zip}
                  {...register('member.zip', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            <h3 className='mt-3 font-semibold'>Point of Contact</h3>
            <div>
              <div className='flex gap-5'>
                <TextInput
                  inputMode='text'
                  label='First Name*'
                  className='input-primary input-sm'
                  error={errors.member?.firstName}
                  {...register('member.firstName', { required: true })}
                />

                <TextInput
                  inputMode='text'
                  label='Last Name*'
                  className='input-primary input-sm'
                  error={errors.member?.lastName}
                  {...register('member.lastName', { required: true })}
                />
              </div>
              <div className='flex gap-2'>
                <Select
                  label='Phone Type*'
                  className='select-primary select-sm'
                  options={phoneTypes}
                  {...register('member.phoneType', { required: true })}
                />

                <TextInput
                  label='Phone Number*'
                  inputMode='tel'
                  className='input-primary input-sm'
                  error={errors.member?.phone}
                  {...register('member.phone', { required: true })}
                />
              </div>

              <TextInput
                label='Email*'
                inputMode='text'
                className='input-primary input-sm'
                error={errors.member?.email}
                altLabel={'This will be the primary method of contact.'}
                {...register('member.email', { required: true })}
              />

              <RegType
                register={register('member.memberStatus', { required: true })}
                formType='Business'
              />
            </div>

            <Checkbox
              label='Do you plan to register your horse(s)?'
              className='checkbox-primary checkbox checkbox-sm'
              {...register('horseReg')}
            />

            {isRegHorse && <HorseFieldArray />}
          </div>
        </Payment>
      </form>
    </FormProvider>
  );
}

BusinessRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default BusinessRegistration;
