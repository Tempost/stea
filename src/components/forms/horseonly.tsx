import { FieldValues, FormProvider } from 'react-hook-form';
import { trpc } from '@/utils/trpc';
import {
  HorseModel,
  NonMemberHorseOwnerModel,
  RiderComboModel,
} from '@/backend/prisma/zod';
import { z } from 'zod';

import { TextInput, Select } from '@/components/data-entry';
import { HorseFieldArray, RiderComboFieldArray } from './fieldarrayfields';
import useZodForm from '@/utils/usezodform';

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
  horses: z.array(HorseModel),
  combos: z.array(RiderComboModel).optional(),
});

function HorseRegistration() {
  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: OwnerHorseFormValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const horseMutation = trpc.useMutation([
    'nonMemberHorseOwner.add-owner-horse',
  ]);

  function onSumbit(formValues: FieldValues) {
    // TODO: Find better way to do this
    formValues.owner.fullName = `${formValues.owner.firstName} ${formValues.owner.lastName}`;
    horseMutation.mutate({
      horses: formValues.horses,
      owner: formValues.owner,
      combos: formValues.riderCombos,
    });
    console.log(formValues);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <h2 className='divider'>Horse Registration</h2>
        <div className='flex flex-col gap-2'>
          <h3>Owner Information</h3>

          <div className='flex gap-5'>
            <TextInput
              inputMode='text'
              label='First Name*'
              className='input-sm'
              {...register('owner.firstName', { required: true })}
            />

            <TextInput
              inputMode='text'
              label='Last Name*'
              className='input-sm'
              {...register('owner.lastName', { required: true })}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <TextInput
              label='Email'
              inputMode='text'
              className='input-sm'
              altLabel='This will the primary method of contact, ensure it is up to date!'
              {...register('owner.email', { required: true })}
            />

            <div className='flex gap-2'>
              <Select
                label='Phone Type*'
                className='select-sm'
                options={phoneTypes}
                {...register('owner.phoneType', { required: true })}
              />

              <TextInput
                label='Phone Number*'
                inputMode='tel'
                className='input-sm'
                {...register('owner.phone', { required: true })}
              />
            </div>
          </div>
          <HorseFieldArray />
          <RiderComboFieldArray />
        </div>

        <button
          className='btn btn-primary mt-8 w-full'
          type='submit'
        >
          Finished
        </button>
      </form>
    </FormProvider>
  );
}

export default HorseRegistration;
