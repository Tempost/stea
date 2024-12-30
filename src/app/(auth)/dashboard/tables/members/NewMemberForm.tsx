'use client';
import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import Modal from '@/components/styled-ui/Modal';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import useZodForm from '@/utils/usezodform';
import Form from '../../../../../components/forms/Form';
import states from '@/utils/states.json';
import { capitalize, cn } from '@/utils/helpers';
import ControlledDatePicker from '@/components/data-entry/Date';
import { TypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/TypeSchema';
import { StatusSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusSchema';
import { StatusTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusTypeSchema';
import { z } from 'zod';
import { optionsFromObject } from '@/components/helpers';
import { MemberOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/MemberSchema';
import add, { ActionState } from './action';
import { useState, useTransition } from 'react';
import Alert from '@/components/forms/Alert';
import { setMembershipYear } from '@/server/router/utils';

export const NewMemberSchema = MemberOptionalDefaultsSchema.omit({
  fullName: true,
  comments: true,
});

const initialState: ActionState = {
  message: '',
  error: false,
  data: undefined,
};

function NewMemberForm() {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState(initialState);

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: NewMemberSchema,
    defaultValues: {
      businessName: null,
      membershipEnd: setMembershipYear(),
      dateOfBirth: null,
    },
  });

  const { register } = form;

  function onSubmit(formValues: z.infer<typeof NewMemberSchema>) {
    startTransition(async () => {
      const member = await add(formValues);
      setState(member);
      console.log(member);

      if (!member.error) {
        form.reset();
      }
    });
  }

  return (
    <Modal
      id='new-member-form'
      buttonLabel='Add Member'
      onClick={() => {
        form.clearErrors();
        form.reset();
      }}
      ok={
        <button
          form='member-form'
          type='submit'
          className={cn('btn btn-sm', {
            loading: pending,
            'btn-success': state.message === 'Success',
          })}
        >
          Add
        </button>
      }
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        id='member-form'
      >
        <h3 className='text-lg font-bold'>Enter Member Information</h3>
        <div className='flex flex-col gap-1'>
          <span className='flex space-x-5'>
            <Input
              type='text'
              label='First Name'
              {...register('firstName')}
            />

            <Input
              type='text'
              label='Last Name'
              {...register('lastName')}
            />
          </span>

          <Input
            type='text'
            placeholder='Address Line 1'
            {...register('address')}
          />

          <span className='flex space-x-5'>
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
          </span>

          <span className='flex space-x-5'>
            <Select
              label='Phone Type*'
              {...register('phoneType')}
            >
              {optionsFromObject(PhoneTypeSchema.enum)}
            </Select>

            <Input
              type='text'
              label='Phone Number'
              {...register('phone')}
            />
          </span>

          <Input
            type='text'
            label='Email'
            {...register('email')}
          />

          <ControlledDatePicker
            name='dateOfBirth'
            label='Date of Birth (If under 18)'
          />

          <span className='flex space-x-1'>
            <Select
              label='Membership Level'
              {...register('memberStatus')}
            >
              {optionsFromObject(StatusSchema.enum)}
            </Select>

            <Select
              label='Member Type'
              {...register('memberType')}
            >
              {optionsFromObject(TypeSchema.enum)}
            </Select>

            <Select
              label='Rider Level'
              {...register('memberStatusType')}
            >
              {optionsFromObject(StatusTypeSchema.enum)}
            </Select>
          </span>
        </div>
      </Form>
      <Alert
        visible={state.error}
        message={state.message}
      />
    </Modal>
  );
}

export default NewMemberForm;
