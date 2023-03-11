import { useSetAtom } from 'jotai';
import { ReactElement, useState } from 'react';

import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import { FormLayout } from '@/components/layout/FormLayout';
import { OwnerHorseFormSchema, OwnerHorseForm } from '@/utils/zodschemas';
import { updateFormState } from '@/utils/atoms';
import { trpc } from '@/utils/trpc';
import useZodForm from '@/utils/usezodform';
import Form from '@/components/forms/Form';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import Payment from '@/components/forms/Payment';
import HorseFieldArray from '@/components/forms/HorseFieldArray';

function HorseRegistration() {
  const [payment, togglePayment] = useState(false);
  const check = trpc.horses.exists.useMutation({
    onSuccess() {
      togglePayment(true);
    },
  });

  const insert = trpc.nonMemberHorseOwners.add.useMutation();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: OwnerHorseFormSchema,
  });

  const { register } = form;

  const update = useSetAtom(updateFormState);

  function onSubmit(formValues: OwnerHorseForm) {
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

      check.mutate(formValues.horses);
    }
  }

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
    >
      <Payment
        showPayment={payment}
        formMutation={{
          error: check.isError,
          message: check.error?.message,
          mutateFn: () => insert.mutate(form.getValues()),
        }}
      >
        <h2 className='divider'>Horse Registration</h2>
        <section className='flex flex-col gap-2'>
          <h3>Owner Information</h3>

          <div className='flex gap-5'>
            <Input
              type='text'
              label='First Name*'
              className='input-bordered input-primary input input-sm w-full'
              {...register('owner.firstName')}
            />

            <Input
              type='text'
              label='Last Name*'
              className='input-bordered input-primary input input-sm w-full'
              {...register('owner.lastName')}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Input
              label='Email'
              type='text'
              className='input-bordered input-primary input input-sm w-full'
              altLabel='This will be the primary method of contact.'
              {...register('owner.email')}
            />

            <span className='flex gap-2'>
              <Select
                label='Phone Type*'
                className='select-bordered select-primary select md:select-sm'
                {...register('owner.phoneType')}
              >
                {Object.keys(PhoneTypeSchema.enum).map(type => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </Select>

              <Input
                label='Phone Number*'
                type='tel'
                className='input-bordered input-primary input input-sm w-full'
                {...register('owner.phone')}
              />
            </span>
          </div>
        </section>

        <section className='mt-10 grid gap-5'>
          <HorseFieldArray />
        </section>
      </Payment>
    </Form>
  );
}

HorseRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default HorseRegistration;
