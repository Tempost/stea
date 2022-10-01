import { ReactElement, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSetAtom } from 'jotai';

import { TextInput, Select } from '@/components/data-entry';
import { HorseFieldArray } from '@/components/forms/fieldarrayfields';
import useZodForm from '@/utils/usezodform';
import { FormLayout } from '@/components/layout';
import Payment from '@/components/forms/Payment';
import phoneTypes from '@/utils/phoneTypes.json';
import triggerValidation from '@/utils/formvalidation';
import { OwnerHorseFormValues } from '@/utils/zodschemas';
import { updateFormState } from '@/utils/atoms';

function HorseRegistration() {
  const [payment, togglePayment] = useState(false);
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
  return (
    <FormProvider {...methods}>
      <form>
        <Payment
          showPayment={payment}
          formValidation={() =>
            triggerValidation<OwnerHorseFormValues>(
              methods,
              togglePayment,
              update
            )
          }
          mutation='nonMemberHorseOwner.add-owner-horse'
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
