'use client';
import Form from '@/components/form/Form';
import { optionsFromObject } from '@/components/helpers';
import Alert from '@/components/styled-ui/Alert';
import { Button } from '@/components/styled-ui/Button';
import Loading from '@/components/styled-ui/Loading';
import Modal from '@/components/styled-ui/Modal';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import { StatusSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusSchema';
import { StatusTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusTypeSchema';
import { TypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/TypeSchema';
import { MemberOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/MemberSchema';
import { capitalize } from '@/utils/helpers';
import { setMembershipYear } from '@/utils/setmembershipyear';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { ActionState, add } from './action';

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
        <Button
          form='member-form'
          type='submit'
          size='sm'
          variant={state.message === 'Success' ? 'success' : null}
        >
          {pending ? <Loading /> : 'Add'}
        </Button>
      }
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        id='member-form'
      >
        <legend className='fieldset-legend text-lg font-bold'>
          Enter Member Information
        </legend>

        <fieldset
          id='name'
          className='flex flex-col gap-2 md:flex-row'
        >
          <Form.Input
            type='text'
            label='First Name'
            {...register('firstName')}
          />

          <Form.Input
            type='text'
            label='Last Name'
            {...register('lastName')}
          />
        </fieldset>

        <fieldset
          id='address-group'
          className='fieldset'
        >
          <Form.Input
            type='text'
            placeholder='Address Line 1'
            {...register('address')}
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
          className='fieldset'
        >
          <div className='flex flex-col gap-2 md:flex-row'>
            <Form.Select
              label='Phone Type*'
              defaultValue=''
              {...register('phoneType')}
            >
              <option
                disabled
                value=''
              />
              {optionsFromObject(PhoneTypeSchema.enum)}
            </Form.Select>

            <Form.Input
              type='text'
              label='Phone Number'
              {...register('phone')}
            />
          </div>

          <Form.Input
            type='text'
            label='Email'
            {...register('email')}
          />
        </fieldset>

        <div className='grid grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 md:grid-cols-3'>
          <Form.Input
            label='Date of Birth'
            type='date'
            {...register('dateOfBirth')}
          />

          <Form.Select
            label='Membership Level'
            {...register('memberStatus')}
          >
            {optionsFromObject(StatusSchema.enum)}
          </Form.Select>

          <Form.Select
            label='Member Type'
            {...register('memberType')}
          >
            {optionsFromObject(TypeSchema.enum)}
          </Form.Select>

          <Form.Select
            label='Rider Level'
            {...register('memberStatusType')}
          >
            {optionsFromObject(StatusTypeSchema.enum)}
          </Form.Select>
        </div>
      </Form>
      <Alert
        icon='error'
        hidden={state.error}
        message={state.message}
      />
    </Modal>
  );
}

export default NewMemberForm;
