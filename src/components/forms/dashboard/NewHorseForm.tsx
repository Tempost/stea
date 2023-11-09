import { ChangeEvent } from 'react';
import { z } from 'zod';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';

import Input from '@/components/data-entry/Input';
import Modal from '@/components/styled-ui/Modal';
import useZodForm from '@/utils/usezodform';
import Form from '../Form';
import { trpc } from '@/utils/trpc';
import { HorseOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/HorseSchema';
import Select from '@/components/data-entry/Select';
import { changeSelectionAtom, ownerTypeAtom } from '@/utils/atoms';
import Radio from '@/components/data-entry/Radio';

function MemberSelection() {
  const members = trpc.members.all.useQuery({ select: { fullName: true } });
  const { register } = useFormContext();

  return (
    <Select
      className='select-bordered select-primary select w-full md:select-sm'
      label='Members'
      {...register('memberName')}
    >
      {members.isLoading ? (
        <option>Loading...</option>
      ) : members.isError ? (
        <option>Error...</option>
      ) : (
        members.data.map(member => (
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
  const owners = trpc.nonMemberHorseOwners.all.useQuery({
    select: { fullName: true },
  });
  const { register } = useFormContext();

  return (
    <Select
      className='select-bordered select-primary select w-full md:select-sm'
      label='Non-Members'
      {...register('owner')}
    >
      {owners.isLoading ? (
        <option>Loading...</option>
      ) : owners.isError ? (
        <option>Error...</option>
      ) : (
        owners.data.map(member => (
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

function NewHorseForm() {
  const state = useAtomValue(ownerTypeAtom);
  const update = useSetAtom(changeSelectionAtom);

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: HorseOptionalDefaultsSchema,
    defaultValues: {
      memberName: null,
      owner: null,
    },
  });

  function resetForm() {
    form.clearErrors();
    form.reset();
    update('none');
  }

  const { register } = form;
  const utils = trpc.useContext();
  const insert = trpc.horses.add.useMutation({
    onSuccess() {
      utils.members.invalidate();
      resetForm();
    },
  });

  function onSubmit(formValues: z.infer<typeof HorseOptionalDefaultsSchema>) {
    insert.mutate(formValues);
  }

  function handleSelection(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'member') {
      form.resetField('owner');
    } else {
      form.resetField('memberName');
    }
    update(e.target.value);
  }

  return (
    <Modal
      buttonLabel='Add Horse'
      onClick={() => resetForm()}
      ok={
        <button
          form='horse-form'
          type='submit'
          className={`btn-sm btn
            ${
              insert.isError
                ? 'btn-error'
                : insert.isSuccess
                ? 'btn-success'
                : ''
            }`}
        >
          Add
        </button>
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
              className='input-bordered input-primary input w-full md:input-sm'
              type='text'
              label='Horse RN'
              {...register('horseRN')}
            />

            <Input
              className='input-bordered input-primary input w-full md:input-sm'
              type='text'
              label='Horse Barn Name'
              {...register('horseAKA')}
            />
          </span>

          <Select
            label='Type of Member'
            className='select-bordered select-primary select w-full md:select-sm'
            name='owner-type'
            onChange={handleSelection}
          >
            <option value='none'>None</option>
            <option value='member'>Member</option>
            <option value='non-member'>Non-Member</option>
          </Select>

          <span className={`${state === 'none' ? 'hidden' : ''}`}>
            {state === 'member' ? <MemberSelection /> : <OwnerSelection />}
          </span>

          <h3>Registration Type*</h3>
          <Radio
            label='Annual'
            value='Annual'
            className='radio-primary radio align-middle md:radio-sm'
            {...register('regType')}
          />

          <Radio
            label='Life'
            value='Life'
            className='radio-primary radio align-middle md:radio-sm'
            {...register('regType')}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default NewHorseForm;
