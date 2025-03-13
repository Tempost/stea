'use client';
import { ChangeEvent, useState, useTransition } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '@/components/data-entry/Input';
import Radio from '@/components/data-entry/Radio';
import Select from '@/components/data-entry/Select';
import Form from '@/components/forms/Form';
import { Button } from '@/components/styled-ui/Button';
import Modal from '@/components/styled-ui/Modal';
import {
  HorseOptionalDefaults,
  HorseOptionalDefaultsSchema,
} from '@/server/prisma/zod-generated/modelSchema/HorseSchema';
import { cn } from '@/utils/helpers';
import useZodForm from '@/utils/usezodform';
import { Member, NonMemberHorseOwner } from '@prisma/client';
import useSWR, { Fetcher } from 'swr';
import add, { ActionState } from './action';
import Alert from '@/components/forms/Alert';

const memberFetcher: Fetcher<Array<Member>, string> = (...args) =>
  fetch(...args).then(res => res.json());

const ownerFetcher: Fetcher<Array<NonMemberHorseOwner>, string> = (...args) =>
  fetch(...args).then(res => res.json());

function MemberSelection() {
  const { data, error } = useSWR('/api/dashboard/members', memberFetcher, {
    revalidateOnFocus: false,
  });
  const { register } = useFormContext();

  return (
    <Select
      label='Members'
      defaultValue=''
      {...register('memberName')}
    >
      <option
        value=''
        disabled
      >
        Select a member
      </option>
      {!data ? (
        <option>Loading...</option>
      ) : error ? (
        <option>Error...</option>
      ) : (
        data.map(member => (
          <option
            key={member.fullName}
            value={member.fullName}
          >
            {member.fullName}
          </option>
        ))
      )}
    </Select>
  );
}

function OwnerSelection() {
  const { data, error } = useSWR('/api/dashboard/owners', ownerFetcher, {
    revalidateOnFocus: false,
  });
  const { register } = useFormContext();

  return (
    <Select
      label='Non-Members'
      defaultValue=''
      {...register('owner')}
    >
      <option
        value=''
        disabled
      >
        Select an owner
      </option>
      {!data ? (
        <option>Loading...</option>
      ) : error ? (
        <option>Error...</option>
      ) : (
        data.map(member => (
          <option
            key={member.fullName}
            value={member.fullName}
          >
            {member.fullName}
          </option>
        ))
      )}
    </Select>
  );
}

const initialState: ActionState = {
  message: '',
  error: false,
};

function NewHorseForm() {
  const [memberType, setMemberType] = useState<string>('none');
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(initialState);

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: HorseOptionalDefaultsSchema,
    defaultValues: {
      memberName: null,
      owner: null,
      registrationEnd: null,
    },
  });

  function resetForm() {
    form.clearErrors();
    form.reset();
  }

  const { register } = form;

  function onSubmit(formValues: HorseOptionalDefaults) {
    startTransition(async () => {
      const res = await add(formValues);
      setState(res);
    });
  }

  function handleSelection(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'member') {
      form.resetField('owner');
    } else {
      form.resetField('memberName');
    }
    setMemberType(e.target.value);
  }

  return (
    <Modal
      id='new-horse-modal'
      buttonLabel='Add Horse'
      onClick={() => resetForm()}
      ok={
        <Button
          form='horse-form'
          type='submit'
          size='sm'
          className={cn({
            loading: pending,
            'btn-error': state.error,
            'btn-success': state.message === 'Success',
          })}
        >
          Add
        </Button>
      }
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        id='horse-form'
      >
        <h3 className='text-lg font-bold'>Enter Member Information</h3>
        <div className='flex flex-col gap-2'>
          <span className='flex space-x-5'>
            <Input
              type='text'
              label='Horse RN'
              {...register('horseRN')}
            />

            <Input
              type='text'
              label='Horse Barn Name'
              {...register('horseAKA')}
            />
          </span>

          <Select
            label='Type of Member'
            name='owner-type'
            onChange={handleSelection}
          >
            <option value='none'>None</option>
            <option value='member'>Member</option>
            <option value='non-member'>Non-Member</option>
          </Select>

          <span className={cn({ hidden: memberType === 'none' })}>
            {memberType === 'member' ? (
              <MemberSelection />
            ) : memberType == 'non-member' ? (
              <OwnerSelection />
            ) : null}
          </span>

          <h3>Registration Type*</h3>
          <Radio
            label='Annual'
            value='Annual'
            {...register('regType')}
          />

          <Radio
            label='Life'
            value='Life'
            {...register('regType')}
          />
        </div>
        <Alert
          visible={state.error}
          message={state.message}
        />
      </Form>
    </Modal>
  );
}

export default NewHorseForm;
