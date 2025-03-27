'use client';
import { useState, useTransition } from 'react';

import { OwnerHorseFormSchema, OwnerHorseForm } from '@/utils/zodschemas';
import useZodForm from '@/utils/usezodform';
import Form from '@/components/form/Form';
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
    mode: 'onSubmit',
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
        <fieldset
          id='owner'
          className='fieldset gap-2'
        >
          <legend className='fieldset-legend'>Owner Information</legend>
          <div className='flex gap-2'>
            <Form.Input
              type='text'
              label='First Name*'
              {...register('firstName')}
            />

            <Form.Input
              type='text'
              label='Last Name*'
              {...register('lastName')}
            />
          </div>

          <fieldset
            id='contact-info'
            className='fieldset flex flex-col gap-2'
          >
            <Form.Input
              label='Email'
              type='email'
              {...register('email')}
            />

            <div className='flex gap-2'>
              <Form.Select
                label='Phone Type*'
                defaultValue=''
                {...register('phoneType')}
              >
                <option
                  disabled
                  value=''
                >
                  Select
                </option>
                {Object.keys(PhoneTypeSchema.enum).map(type => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </Form.Select>

              <Form.Input
                label='Phone Number*'
                type='tel'
                {...register('phone')}
              />
            </div>
          </fieldset>
        </fieldset>

        <HorseFieldArray />
      </Payment>
    </Form>
  );
}

export default HorseRegistration;
