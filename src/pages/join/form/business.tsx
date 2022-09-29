import { ReactElement } from 'react';
import { FieldValues, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import {
  TextInput,
  Select,
  NumericInput,
  Checkbox,
} from '@/components/data-entry';

import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { HorseModel, MemberModel } from '@/backend/prisma/zod';
import {
  HorseFieldArray,
  RiderComboFieldArray,
} from '@/components/forms/fieldarrayfields';
import RegType from '@/components/forms/regtype';
import { useSetAtom } from 'jotai';
import { updateFormState } from '@/utils/atoms';
import { FormLayout } from '@/components/layout';
import { Type } from '@prisma/client';
import { useRouter } from 'next/router';

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

function BusinessRegistration() {
  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: MemberFormValues,
  });
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const update = useSetAtom(updateFormState);
  const router = useRouter();

  const isRegHorse = watch('horseReg', false);

  function onSumbit(formValues: FieldValues) {
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

    methods.trigger().then((valid) => {
      if (valid) {
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
        router.push('/join/form/payment');
      }
    });
  }

  setValue('member.memberType', 'Individual' as Type);
  setValue('member.boardMember', false);
  setValue('member.confirmed', false);
  setValue('member.currentUSEAMember', false);
  setValue('member.JRSR', 'SR');

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <h2 className='divider'>Business Registration</h2>

        <h3 className='text-center mb-2 p-4 border-solid border rounded-2xl border-gray-400 bg-gray-100'>
          As part of the membership you can submit
          <br />
          your company logo for our home page!
          <br/>
          Submit to stea@stevening.net
        </h3>

        <div className='flex flex-col gap-2'>
          <h3 className='text-sm'>Name of Business*</h3>
          <TextInput
            inputMode='text'
            className='input-sm input-primary'
            error={errors.member?.businessName}
            {...register('member.businessName', { required: true })}
          />

          <h3 className='text-sm'>Business Address*</h3>
          <div className='flex flex-col gap-2'>
            <TextInput
              inputMode='text'
              className='input-sm input-primary'
              placeholder='Address Line 1'
              error={errors.member?.address}
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
                error={errors.member?.city}
                {...register('member.city', { required: true })}
              />

              <Select
                className='select-sm select-primary'
                options={states}
                error={errors.member?.state}
                {...register('member.state', { required: true })}
              />

              <NumericInput
                inputMode='numeric'
                className='input-sm input-primary'
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
                className='input-sm input-primary'
                error={errors.member?.firstName}
                {...register('member.firstName', { required: true })}
              />

              <TextInput
                inputMode='text'
                label='Last Name*'
                className='input-sm input-primary'
                error={errors.member?.lastName}
                {...register('member.lastName', { required: true })}
              />
            </div>
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
                error={errors.member?.phone}
                {...register('member.phone', { required: true })}
              />
            </div>

            <TextInput
              label='Email*'
              inputMode='text'
              className='input-sm input-primary'
              error={errors.member?.email}
              altLabel={
                'This will be the primary method of contact.'
              }
              {...register('member.email', { required: true })}
            />

            <RegType
              register={register('member.memberStatus', { required: true })}
            />
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            className='checkbox checkbox-primary checkbox-sm'
            {...register('horseReg')}
          />

          {isRegHorse && <HorseFieldArray />}
          {isRegHorse && <RiderComboFieldArray />}
          <button
            type='button'
            className='btn btn-primary w-full'
            onClick={() => triggerValidation()}
          >
            Move to payment
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

BusinessRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default BusinessRegistration;
