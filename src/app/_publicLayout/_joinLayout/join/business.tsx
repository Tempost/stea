import { useState, useTransition } from 'react';

import Form from '@/components/form/Form';
import HorseFieldArray from '@/components/forms/HorseFieldArray';
import Payment from '@/components/forms/Payment';
import RegistrationYearSelect from '@/components/forms/RegistrationYearSelect';
import RegistrationSelect from '@/components/forms/RegType';
import { optionsFromObject } from '@/components/helpers';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import { capitalize } from '@/utils/helpers';
import { setMembershipYear } from '@/utils/setmembershipyear';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { MemberForm, MemberFormSchema } from '@/utils/zodschemas';
import { createFileRoute } from '@tanstack/react-router';
import {
  ActionState,
  checkForExistingMember,
  upsertMember,
} from '../../../../server/functions/member';

const initialState: ActionState = {
  message: undefined,
  error: false,
  data: undefined,
};

export const Route = createFileRoute(
  '/_publicLayout/_joinLayout/join/business',
)({
  component: BusinessRegistration,
});

function BusinessRegistration() {
  const [payment, togglePayment] = useState(false);
  const [isRegHorse, toggleRegHorse] = useState(false);
  const [actionState, setActionState] = useState(initialState);

  const [pending, startTransition] = useTransition();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormSchema,
    defaultValues: {
      dateOfBirth: null,
      memberType: 'Business',
      memberStatusType: 'Professional',
      membershipEnd: setMembershipYear(),
    },
  });

  const { register, control } = form;

  const onFormSubmit = (formValues: MemberForm) =>
    startTransition(async () => {
      const res = await checkForExistingMember({ data: formValues });
      setActionState(res);
      if (!res.error) {
        togglePayment(curr => !curr);
      }
    });

  const onPaymentSuccess = () =>
    startTransition(async () => {
      if (actionState.data) {
        const res = await upsertMember({ data: actionState.data });
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
        <h2 className='divider'>Business Registration</h2>

        <h3 className='mx-auto mb-3 w-fit rounded-2xl border border-solid border-gray-400 bg-gray-200 p-2 text-center'>
          As part of membership you can submit
          <br />
          your company logo to display our home page.
          <br />
          Please send to stea@stevening.net
        </h3>

        <Form.Input
          type='text'
          label='Business Name*'
          {...register('businessName')}
        />

        <fieldset
          id='address-group'
          className='fieldset flex flex-col gap-2'
        >
          <legend className='fieldset-legend'>Business Address*</legend>
          <Form.Input
            type='text'
            placeholder='Address Line 1'
            {...register('address')}
          />

          <Form.Input
            type='text'
            placeholder='Address Line 2'
            name='temp'
          />

          <div className='flex flex-col gap-2 md:flex-row'>
            <Form.Input
              type='text'
              placeholder='City'
              {...register('city')}
            />

            <Form.Select {...register('state')}>
              {states.map(state => (
                <option
                  key={state.value}
                  value={state.value}
                >
                  {capitalize(state.label)}
                </option>
              ))}
            </Form.Select>

            <Form.Input
              type='numeric'
              placeholder='Zip Code'
              {...register('zip', { valueAsNumber: true })}
            />
          </div>
        </fieldset>

        <fieldset
          id='contact-info'
          className='fieldset flex flex-col gap-2'
        >
          <legend className='fieldset-legend'>Point of Contact</legend>
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

          <div className='mt-1 flex gap-2'>
            <Form.Select
              {...register('phoneType')}
              label='Phone Type*'
              defaultValue=''
            >
              <option
                disabled
                value=''
              >
                Select
              </option>
              {optionsFromObject(PhoneTypeSchema.enum)}
            </Form.Select>

            <Form.Input
              label='Phone Number*'
              type='tel'
              {...register('phone')}
            />
          </div>

          <Form.Input
            label='Email*'
            type='email'
            {...register('email')}
          />
        </fieldset>

        <div className='flex flex-col'>
          <RegistrationSelect
            register={register('memberStatus')}
            formType='business'
            price
          />

          <RegistrationYearSelect
            heading='Which year are you registering for?'
            watchFieldName='memberStatus'
            control={control}
            register={register('membershipEnd')}
          />
        </div>

        <Form.Checkbox
          label='Do you plan to register your horse(s)?'
          checked={isRegHorse}
          className='md:checkbox-sm'
          onChange={() => toggleRegHorse(curr => !curr)}
        />

        {isRegHorse && <HorseFieldArray />}
      </Payment>
    </Form>
  );
}
