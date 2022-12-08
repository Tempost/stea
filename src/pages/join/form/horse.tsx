import { ReactElement, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSetAtom } from 'jotai';

import { TextInput, Select } from '@/components/data-entry';
import { HorseFieldArray, Payment } from '@/components/forms';
import useZodForm from '@/utils/usezodform';
import { FormLayout } from '@/components/layout';
import phoneTypes from '@/utils/phoneTypes.json';
import { OwnerHorseFormValues } from '@/utils/zodschemas';
import { updateFormState } from '@/utils/atoms';
import { trpc } from '@/utils/trpc';

function HorseRegistration() {
  const [payment, togglePayment] = useState(false);
  const check = trpc.horses.exists.useMutation({
    onSuccess() {
      togglePayment(true);
    },
  });

  const insert = trpc.nonMemberHorseOwners.add.useMutation();

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: OwnerHorseFormValues,
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const update = useSetAtom(updateFormState);

  function onSubmit(formValues: OwnerHorseFormValues) {
    if (formValues.horses) {
      check.mutate(formValues);
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
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Payment
          showPayment={payment}
          formMutation={{
            error: check.isError,
            message: check.error?.message,
            mutateFn: () => insert.mutate(methods.getValues()),
          }}
        >
          <h2 className='divider'>Horse Registration</h2>
          <section className='flex flex-col gap-2'>
            <h3>Owner Information</h3>

            <div className='flex gap-5'>
              <TextInput
                inputMode='text'
                label='First Name*'
                className='input-primary input-sm'
                error={errors.owner?.firstName}
                {...register('owner.firstName', { required: true })}
              />

              <TextInput
                inputMode='text'
                label='Last Name*'
                className='input-primary input-sm'
                error={errors.owner?.lastName}
                {...register('owner.lastName', { required: true })}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <TextInput
                label='Email'
                inputMode='text'
                className='input-primary input-sm'
                error={errors.owner?.email}
                altLabel='This will be the primary method of contact.'
                {...register('owner.email', { required: true })}
              />

              <span className='flex gap-2'>
                <Select
                  label='Phone Type*'
                  className='input-primary select-sm'
                  options={phoneTypes}
                  {...register('owner.phoneType', { required: true })}
                />

                <TextInput
                  label='Phone Number*'
                  inputMode='tel'
                  className='input-primary input-sm'
                  error={errors.owner?.phone}
                  {...register('owner.phone', { required: true })}
                />
              </span>
            </div>
          </section>

          <section className='mt-10 grid gap-5'>
            <HorseFieldArray />
          </section>
        </Payment>
      </form>
    </FormProvider>
  );
}

HorseRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default HorseRegistration;
