import { ReactElement } from 'react';
import { FieldValues, FormProvider } from 'react-hook-form';
import { trpc } from '@/utils/trpc';
import {
  HorseModel,
  NonMemberHorseOwnerModel,
  RiderComboModel,
} from '@/backend/prisma/zod';
import { z } from 'zod';

import { TextInput, Select } from '@/components/data-entry';
import {
  HorseFieldArray,
  RiderComboFieldArray,
} from '@/components/forms/fieldarrayfields';
import useZodForm from '@/utils/usezodform';
import { FormLayout } from '@/components/layout';
import { Horse } from '@prisma/client';
import { useSetAtom } from 'jotai';
import { updateFormState } from '@/utils/atoms';

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

const OwnerHorseFormValues = z.object({
  owner: NonMemberHorseOwnerModel.omit({ fullName: true }).required(),
  horses: z.array(HorseModel).min(1, 'Horse is required'),
  riderCombos: z
    .array(RiderComboModel.omit({ uid: true }))
    .min(1, 'Rider combo is required'),
});

function HorseRegistration() {
  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: OwnerHorseFormValues,
  });

  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;

  const horseMutation = trpc.useMutation([
    'nonMemberHorseOwner.add-owner-horse',
  ]);

  const update = useSetAtom(updateFormState);

  const finishButtonStyles = `
    btn
    btn-primary
    mt-8
    w-full
  `;

  function onSumbit(formValues: FieldValues) {
    if (formValues.horses !== undefined) {
      const lifeCount = formValues.horses.filter(
        (horse: Horse) => horse.regType === 'Life'
      ).length;

      const annualCount = formValues.horses.filter(
        (horse: Horse) => horse.regType === 'Annual'
      ).length;

      update({
        type: 'HORSE',
        payload: { lifeCount: lifeCount, annualCount: annualCount },
      });
    }

    // TODO: Find better way to do this
    formValues.owner.fullName = `${formValues.owner.firstName} ${formValues.owner.lastName}`;
    // horseMutation.mutate({
    //   horses: formValues.horses,
    //   owner: formValues.owner,
    //   combos: formValues.riderCombos,
    // });
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <h2 className='divider'>Horse Registration</h2>
        <section className='flex flex-col gap-2'>
          <h3>Owner Information</h3>

          <div className='flex gap-5'>
            <TextInput
              inputMode='text'
              label='First Name*'
              className='input-sm input-primary'
              error={errors.owner?.firstName}
              {...register('owner.firstName', { required: true })}
            />

            <TextInput
              inputMode='text'
              label='Last Name*'
              className='input-sm input-primary'
              error={errors.owner?.lastName}
              {...register('owner.lastName', { required: true })}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <TextInput
              label='Email'
              inputMode='text'
              className='input-sm input-primary'
              error={errors.owner?.email}
              altLabel='This will the primary method of contact, ensure it is up to date!'
              {...register('owner.email', { required: true })}
            />

            <span className='flex gap-2'>
              <Select
                label='Phone Type*'
                className='select-sm input-primary'
                options={phoneTypes}
                {...register('owner.phoneType', { required: true })}
              />

              <TextInput
                label='Phone Number*'
                inputMode='tel'
                className='input-sm input-primary'
                error={errors.owner?.phone}
                {...register('owner.phone', { required: true })}
              />
            </span>
          </div>
        </section>

        <section className='mt-10 grid gap-5'>
          <HorseFieldArray />
          <RiderComboFieldArray />
        </section>

        <button
          type='submit'
          className={finishButtonStyles}
        >
          Move to payment
        </button>
      </form>
    </FormProvider >
  );
}

HorseRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default HorseRegistration;
