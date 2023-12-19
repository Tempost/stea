import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import Modal from '@/components/styled-ui/Modal';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import useZodForm from '@/utils/usezodform';
import { MemberFormSchema } from '@/utils/zodschemas';
import Form from '../Form';
import states from '@/utils/states.json';
import { capitalize } from '@/utils/helpers';
import ControlledDatePicker from '@/components/data-entry/Date';
import { TypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/TypeSchema';
import { StatusSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusSchema';
import { StatusTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/StatusTypeSchema';
import { trpc } from '@/utils/trpc';
import { z } from 'zod';
import { optionsFromObject } from '@/components/helpers';

function NewMemberForm() {
  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormSchema.shape.memberInput,
    defaultValues: {
      businessName: null,
    },
  });

  const { register } = form;
  const utils = trpc.useContext();
  const insert = trpc.members.manualAdd.useMutation({
    onSuccess() {
      utils.members.invalidate();
      form.clearErrors();
      form.reset();
    },
  });

  // TODO: Better type after creating form
  function onSubmit(formValues: z.infer<typeof MemberFormSchema.shape.memberInput>) {
    insert.mutate(formValues);
  }

  // Issue with using space-x-1 with the buttons
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
        id='member-form'
      >
        <h3 className='text-lg font-bold'>Enter Member Information</h3>
        <div className='flex flex-col gap-1'>
          <span className='flex space-x-5'>
            <Input
              className='input-bordered input-primary input w-full md:input-sm'
              type='text'
              label='First Name'
              {...register('firstName')}
            />

            <Input
              className='input-bordered input-primary input w-full md:input-sm'
              type='text'
              label='Last Name'
              {...register('lastName')}
            />
          </span>

          <Input
            className='input-bordered input-primary input w-full md:input-sm'
            type='text'
            placeholder='Address Line 1'
            {...register('address')}
          />

          <span className='flex space-x-5'>
            <Input
              className='input-bordered input-primary input w-full md:input-sm'
              type='text'
              placeholder='City'
              {...register('city')}
            />

            <Select
              className='select-bordered select-primary select w-full md:select-sm'
              {...register('state')}
            >
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
              className='input-bordered input-primary input w-full md:input-sm'
              type='numeric'
              placeholder='Zip Code'
              {...register('zip', { valueAsNumber: true })}
            />
          </span>

          <span className='flex space-x-5'>
            <Select
              label='Phone Type*'
              className='select-bordered select-primary select md:select-sm'
              {...register('phoneType')}
            >
              {optionsFromObject(PhoneTypeSchema.enum)}
            </Select>

            <Input
              className='input-bordered input-primary input w-full md:input-sm'
              type='text'
              label='Phone Number'
              {...register('phone')}
            />
          </span>

          <Input
            className='input-bordered input-primary input w-full md:input-sm'
            type='text'
            label='Email'
            {...register('email')}
          />

          <ControlledDatePicker
            name='dateOfBirth'
            label='Date of Birth'
          />

          <span className='flex space-x-1'>
            <Select
              label='Membership Level'
              className='select-bordered select-primary select md:select-sm'
              {...register('memberStatus')}
            >
              {optionsFromObject(StatusSchema.enum)}
            </Select>

            <Select
              label='Member Type'
              className='select-bordered select-primary select md:select-sm'
              {...register('memberType')}
            >
              {optionsFromObject(TypeSchema.enum)}
            </Select>

            <Select
              label='Rider Level'
              className='select-bordered select-primary select md:select-sm'
              {...register('memberStatusType')}
            >
              {optionsFromObject(StatusTypeSchema.enum)}
            </Select>
          </span>
        </div>
      </Form>
    </Modal>
  );
}

export default NewMemberForm;
