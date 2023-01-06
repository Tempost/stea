import { useSetAtom } from 'jotai';
import { ReactElement, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { Input, Select } from '@/components/data-entry';
import { HorseFieldArray, Payment } from '@/components/forms';
import { FormLayout } from '@/components/layout';
import { ownerHorseFormSchema, OwnerHorseForm } from '@/utils/zodschemas';
import { updateFormState } from '@/utils/atoms';
import { trpc } from '@/utils/trpc';
import useZodForm from '@/utils/usezodform';
import { PhoneType } from '@prisma/client';

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
    schema: ownerHorseFormSchema,
  });
  const { register } = methods;

  const update = useSetAtom(updateFormState);

  function onSubmit(formValues: OwnerHorseForm) {
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
              <Input
                type='text'
                label='First Name*'
                className='input-primary input-bordered input w-full input-sm'
                {...register('owner.firstName', { required: true })}
              />

              <Input
                type='text'
                label='Last Name*'
                className='input-primary input-bordered input w-full input-sm'
                {...register('owner.lastName', { required: true })}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Input
                label='Email'
                type='text'
                className='input-primary input-bordered input w-full input-sm'
                altLabel='This will be the primary method of contact.'
                {...register('owner.email', { required: true })}
              />

              <span className='flex gap-2'>
                <Select
                  label='Phone Type*'
                  className='select-bordered select select-primary md:select-sm'
                  {...register('owner.phoneType', { required: true })}
                >
                  {Object.keys(PhoneType).map(type => (
                    <option
                      key={type}
                      value={type}
                    >
                      {PhoneType[type as PhoneType]}
                    </option>
                  ))}
                </Select>

                <Input
                  label='Phone Number*'
                  type='tel'
                  className='input-primary input-bordered input w-full input-sm'
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
