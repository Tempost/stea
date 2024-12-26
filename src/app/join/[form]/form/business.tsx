'use client';
import { useState, useTransition } from 'react';

import { MemberForm, MemberFormSchema } from '@/utils/zodschemas';
import { capitalize } from '@/utils/helpers';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import Form from '@/components/forms/Form';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import Payment from '@/components/forms/Payment';
import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import RegistrationSelect from '@/components/forms/RegType';
import Checkbox from '@/components/data-entry/Checkbox';
import HorseFieldArray from '@/components/forms/HorseFieldArray';
import RegistrationYearSelect from '@/components/forms/RegistrationYearSelect';
import {
  ActionState,
  addNewMember,
  checkForExistingMember,
} from './member.action';
import { setMembershipYear } from '@/server/router/utils';

const initialState: ActionState = {
  message: undefined,
  error: false,
  data: undefined,
};

function BusinessRegistration() {
  const [payment, togglePayment] = useState(false);
  const [isRegHorse, toggleRegHorse] = useState(false);
  const [actionState, setActionState] = useState(initialState);

  const [pending, startTransition] = useTransition();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
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
      const res = await checkForExistingMember(formValues);
      setActionState(res);
      if (!res.error) {
        togglePayment(curr => !curr);
      }
    });

  const onPaymentSuccess = () =>
    startTransition(async () => {
      if (actionState.data) {
        const res = await addNewMember(actionState.data);
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

        <h3 className='mb-2 text-wrap rounded-2xl border border-solid border-gray-400 bg-gray-100 p-4 text-center'>
          As part of the membership you can submit
          <br />
          your company logo for our home page!
          <br />
          Submit to stea@stevening.net
        </h3>

        <div className='flex flex-col gap-2'>
          <h3 className='text-sm'>Name of Business*</h3>
          <Input
            type='text'
            {...register('businessName')}
          />

          <h3 className='text-sm'>Business Address*</h3>
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              placeholder='Address Line 1'
              {...register('address')}
            />

            <Input
              type='text'
              placeholder='Address Line 2'
              name='temp'
            />

            <div className='flex gap-1'>
              <Input
                type='text'
                placeholder='City'
                {...register('city')}
              />

              <Select {...register('state')}>
                {states.map(state => (
                  <option
                    key={state.value}
                    value={state.value}
                  >
                    {capitalize(state.label)}
                  </option>
                ))}
              </Select>

              <Input
                type='numeric'
                placeholder='Zip Code'
                {...register('zip', { valueAsNumber: true })}
              />
            </div>
          </div>

          <h3 className='mt-3 font-semibold'>Point of Contact</h3>
          <div>
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
            <div className='flex gap-2'>
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
            </div>

            <Input
              label='Email*'
              type='text'
              altLabel={'This will be the primary method of contact.'}
              {...register('email')}
            />

            <RegistrationSelect
              register={register('memberStatus')}
              formType='business'
            />

            <RegistrationYearSelect
              heading='Which year are you registering for?'
              watchFieldName='memberStatus'
              control={control}
              register={register('membershipEnd')}
            />
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            checked={isRegHorse}
            onChange={() => toggleRegHorse(curr => !curr)}
          />

          {isRegHorse && <HorseFieldArray />}
        </div>
      </Payment>
    </Form>
  );
}

export default BusinessRegistration;
