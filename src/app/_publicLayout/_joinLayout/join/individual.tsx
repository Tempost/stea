import { useState, useTransition } from 'react';

import Form from '@/components/form/Form';
import HorseFieldArray from '@/components/forms/HorseFieldArray';
import MemberType from '@/components/forms/MemberType';
import Payment from '@/components/forms/Payment';
import RegistrationYearSelect from '@/components/forms/RegistrationYearSelect';
import RegistrationSelect from '@/components/forms/RegType';
import Under18 from '@/components/forms/Under18';
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
  '/_publicLayout/_joinLayout/join/individual',
)({
  component: IndividualRegistration,
});

function IndividualRegistration() {
  const [payment, togglePayment] = useState(false);
  const [isRegHorse, toggleRegHorse] = useState(false);
  const [actionState, setActionState] = useState(initialState);

  const [pending, startTransition] = useTransition();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormSchema,
    mode: 'onSubmit',
    defaultValues: {
      dateOfBirth: null,
      memberType: 'Individual',
      membershipEnd: setMembershipYear(),
      businessName: null,
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
        <h2 className='divider'>Individual Membership</h2>

        <fieldset
          id='name'
          className='fieldset flex gap-2'
        >
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
        </fieldset>

        <fieldset
          id='address'
          className='fieldset flex flex-col gap-2'
        >
          <legend className='fieldset-legend'>Address*</legend>
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

            <Form.Select
              defaultValue=''
              {...register('state')}
            >
              {states.map(state => (
                <option
                  key={state.value}
                  value={state.value}
                  disabled={state.value == ''}
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
            formType='individual'
            price
          />

          <RegistrationYearSelect
            heading='Which year are you registering for?'
            watchFieldName='memberStatus'
            control={control}
            register={register('membershipEnd')}
          />

          <MemberType register={register('memberStatusType')} />
        </div>

        <Under18 dateName='dateOfBirth' />

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
