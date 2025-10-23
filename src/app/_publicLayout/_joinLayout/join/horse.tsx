import { useState, useTransition } from 'react';

import Form from '@/components/form/Form';
import HorseFieldArray from '@/components/forms/HorseFieldArray';
import Payment from '@/components/forms/Payment';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import useZodForm from '@/utils/usezodform';
import { OwnerHorseForm, OwnerHorseFormSchema } from '@/utils/zodschemas';
import { createFileRoute } from '@tanstack/react-router';
import {
  addOwner,
  checkForExistingHorses,
  OwnerActionState,
} from '../../../../server/functions/horse';

const initialState: OwnerActionState = {
  message: undefined,
  error: false,
  data: undefined,
};

export const Route = createFileRoute('/_publicLayout/_joinLayout/join/horse')({
  component: HorseRegistration,
});

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
      const res = await checkForExistingHorses({ data: formValues.horses });
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
        const res = await addOwner({ data: actionState.data });
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
