import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import Modal from '@/components/styled-ui/Modal';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import useZodForm from '@/utils/usezodform';
import { MemberFormSchema } from '@/utils/zodschemas';
import Form from '../Form';
import states from '@/utils/states.json';
import { capitalize } from '@/utils/helpers';

function NewMemberForm() {
  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormSchema.shape.member,
    defaultValues: {
      businessName: null,
    },
  });

  const { register } = form;

  // TODO: Better type after creating form
  function onSubmit(formValues: any) {}

  return (
    <Modal
      buttonLabel='Add Show'
      onClick={() => {
        form.clearErrors();
        form.reset();
      }}
      ok={
        <button
          form='show-form'
          type='submit'
        >
          Add
        </button>
      }
    >
      <Form
        form={form}
        onSubmit={onSubmit}
      >
        <h3 className='text-lg font-bold'>Enter Member Information</h3>
        <div className='flex flex-row gap-5'>
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

          <Input
            className='input-bordered input-primary input w-full md:input-sm'
            type='text'
            placeholder='Address Line 1'
            {...register('address')}
          />

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
            {...register('zip')}
          />

          <Select
            label='Phone Type*'
            className='select-bordered select-primary select md:select-sm'
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
            className='input-bordered input-primary input w-full md:input-sm'
            type='text'
            label='Phone Number'
            {...register('phone')}
          />

          <Input
            className='input-bordered input-primary input w-full md:input-sm'
            type='text'
            label='Email'
            {...register('email')}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default NewMemberForm;
