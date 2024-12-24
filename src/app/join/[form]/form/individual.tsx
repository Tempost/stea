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
import MemberType from '@/components/forms/MemberType';
import Under18 from '@/components/forms/Under18';
import Checkbox from '@/components/data-entry/Checkbox';
import HorseFieldArray from '@/components/forms/HorseFieldArray';
import RegistrationYearSelect from '@/components/forms/RegistrationYearSelect';
import { addNewMember, checkForExistingMember } from '@/app/action';
import { Label } from '@/components/styled-ui/Label';

export interface ActionState {
  message: string | undefined;
  error: boolean;
  data: MemberForm | undefined;
}

export const initialState: ActionState = {
  message: undefined,
  error: false,
  data: undefined,
};

const today = new Date();
const curr = new Date(today.getFullYear(), 10, 30);

function IndividualRegistration() {
  const [payment, togglePayment] = useState(false);
  const [isRegHorse, toggleRegHorse] = useState(false);

  const [pending, startTransition] = useTransition();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormSchema,
    defaultValues: {
      dateOfBirth: null,
      memberType: 'Individual',
      membershipEnd: curr,
      businessName: null,
    },
  });

  const { register, control } = form;
  const [actionState, setActionState] = useState(initialState);

  function onSubmit(formValues: MemberForm) {
    startTransition(async () => {
      const test = await checkForExistingMember(formValues);
      setActionState(test);
      if (!test.error) {
        togglePayment(curr => !curr);
      }
    });
  }

  function addMember() {
    startTransition(async () => {
      if (actionState.data) {
        const test = await addNewMember(actionState.data);
        setActionState(test);
      }
    });
  }

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
    >
      <Payment
        showPayment={payment}
        formState={actionState}
        pending={pending}
        onPayment={addMember}
      >
        <h2 className='divider'>Individual Membership</h2>

        <div className='flex gap-1 md:gap-5'>
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

        <Label htmlFor='address-group'>Address*</Label>
        <div
          id='address-group'
          className='flex flex-col gap-2'
        >
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

          <div className='flex flex-col gap-1 md:flex-row'>
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

          <div className='flex flex-col gap-2'>
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
          </div>

          <div className='flex-col'>
            <RegistrationSelect
              register={register('memberStatus')}
              formType='individual'
            />

            <RegistrationYearSelect
              heading='Which year are you registering for?'
              watchFieldName='memberStatus'
              control={control}
              register={register('membershipEnd')}
            />

            <MemberType register={register('memberStatusType')} />

            <Under18 dateName='dateOfBirth' />
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

export default IndividualRegistration;
