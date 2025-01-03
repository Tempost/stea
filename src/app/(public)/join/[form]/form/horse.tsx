'use client';
import { useState, useTransition } from 'react';

import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import { OwnerHorseFormSchema, OwnerHorseForm } from '@/utils/zodschemas';
import useZodForm from '@/utils/usezodform';
import Form from '@/components/forms/Form';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import Payment from '@/components/forms/Payment';
import HorseFieldArray from '@/components/forms/HorseFieldArray';
import {
  OwnerActionState,
  addOwner,
  checkForExistingHorses,
} from './horse.action';

const initialState: OwnerActionState = {
  message: undefined,
  error: false,
  data: undefined,
};

function HorseRegistration() {
  const [payment, togglePayment] = useState(false);
  const [pending, startTransition] = useTransition();
  const [actionState, setActionState] = useState(initialState);

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: OwnerHorseFormSchema,
  });

  const { register } = form;

  const onFormSubmit = (formValues: OwnerHorseForm) =>
    startTransition(async () => {
      const res = await checkForExistingHorses(formValues.horses);
      setActionState({
        ...res,
        data: formValues,
      });
      if (!res.error) {
        togglePayment(curr => !curr);
      }
    });

  const onPaymentSuccess = () =>
    startTransition(async () => {
      if (actionState.data) {
        const res = await addOwner(actionState.data);
        setActionState(res);
      }
    });

  return (
    <Form
      form={form}
      onSubmit={onFormSubmit}
    >
      <Payment
        showPayment={payment}
        formState={actionState}
        pending={pending}
        onPayment={onPaymentSuccess}
      >
        <h2 className='divider'>Horse Registration</h2>
        <section className='flex flex-col gap-2'>
          <h3>Owner Information</h3>

          <div className='flex gap-5'>
            <Input
              type='text'
              label='First Name*'
              {...register('firstName')}
            />

            <Input
              type='text'
              label='Last Name*'
              {...register('lastName')}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Input
              label='Email'
              type='text'
              altLabel='This will be the primary method of contact.'
              {...register('email')}
            />

            <span className='flex gap-2'>
              <Select
                label='Phone Type*'
                {...register('phoneType')}
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
                {...register('phone')}
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

export default HorseRegistration;
