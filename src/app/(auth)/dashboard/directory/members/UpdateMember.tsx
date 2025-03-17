'use client';
import ControlledDatePicker from '@/components/data-entry/Date';
import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import Form from '@/components/forms/Form';
import { optionsFromObject } from '@/components/helpers';
import { Button } from '@/components/styled-ui/Button';
import Loading from '@/components/styled-ui/Loading';
import Modal from '@/components/styled-ui/Modal';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import { StatusSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusSchema';
import { StatusTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusTypeSchema';
import { TypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/TypeSchema';
import MemberSchema from '@/server/prisma/zod-generated/modelSchema/MemberSchema';
import { capitalize, cn } from '@/utils/helpers';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { RowSelectionState } from '@tanstack/react-table';
import {
  Dispatch,
  memo,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { z } from 'zod';
import { ActionState, get, update } from './action';

export const MemberUpdateSchema = MemberSchema.omit({
  comments: true,
  createdAt: true,
});

type MemberUpdate = z.infer<typeof MemberUpdateSchema>;

const initialState = {
  message: '',
  error: false,
  data: undefined,
};

function DumbForm({
  member,
  setFormState,
  startTransition,
}: {
  member: MemberUpdate;
  setFormState: Dispatch<SetStateAction<ActionState>>;
  startTransition: TransitionStartFunction;
}) {
  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberUpdateSchema,
    defaultValues: member,
    mode: 'all',
  });
  const { register } = form;

  function onSubmit(formValues: z.infer<typeof MemberUpdateSchema>) {
    startTransition(async () => {
      const res = await update(formValues);
      setFormState(res);
    });
  }

  return (
    <Form
      form={form}
      id='update-member-form'
      onSubmit={onSubmit}
    >
      <h3 className='text-lg font-bold'>Updating {member['fullName']}</h3>
      <div className='flex flex-col gap-1'>
        <span className='flex space-x-5'>
          <Input
            type='text'
            label='First Name'
            {...register('firstName', { disabled: true })}
          />

          <Input
            type='text'
            label='Last Name'
            {...register('lastName', { disabled: true })}
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
  );
}

const UpdateMember = memo(function UpdateMember({
  rowSelection,
}: {
  rowSelection: RowSelectionState;
}) {
  const [selectionState, setSelectionState] = useState<{
    member: MemberUpdate | undefined;
    loading: boolean;
  }>({ member: undefined, loading: false });
  const [formState, setFormState] = useState<ActionState>(initialState);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (Object.keys(rowSelection).length == 0) {
      setSelectionState(curr => {
        return { ...curr, loading: false, member: undefined };
      });
    } else {
      setSelectionState(curr => {
        return { ...curr, member: undefined, loading: true };
      });
      get(Object.keys(rowSelection)[0]).then(res => {
        setSelectionState(curr => {
          // FIX: Fix as any later...
          return { ...curr, loading: false, member: res as any };
        });
        setFormState(curr => {
          return { ...curr, data: res };
        });
      });
    }
  }, [rowSelection]);

  return (
    <Modal
      id='update-member'
      buttonLabel='Update Member'
      buttonClassName={cn({
        'btn-disabled': Object.keys(rowSelection).length === 0,
      })}
      onClose={() => {
        setFormState(initialState);
      }}
      ok={
        <Button
          form='update-member-form'
          size='sm'
          type='submit'
          className={cn({ 'btn-success': formState.message === 'Success' })}
        >
          {pending ? <Loading /> : 'Confirm'}
        </Button>
      }
    >
      {!selectionState.loading && selectionState.member ? (
        <DumbForm
          member={selectionState.member}
          setFormState={setFormState}
          startTransition={startTransition}
        />
      ) : (
        <Loading />
      )}
    </Modal>
  );
});

export default UpdateMember;
