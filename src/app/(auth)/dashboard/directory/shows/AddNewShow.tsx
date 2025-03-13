import ControlledDatePicker from '@/components/data-entry/Date';
import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import Alert from '@/components/forms/Alert';
import Form from '@/components/forms/Form';
import { Button } from '@/components/styled-ui/Button';
import Modal from '@/components/styled-ui/Modal';
import { ShowTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowTypeSchema';
import {
  ShowOptionalDefaults,
  ShowOptionalDefaultsSchema,
} from '@/server/prisma/zod-generated/modelSchema/ShowSchema';
import { cn } from '@/utils/helpers';
import useZodForm from '@/utils/usezodform';
import { useState, useTransition } from 'react';
import { add, ActionState } from './action';

const initalState: ActionState = {
  message: '',
  error: false,
};

function AddNewShow() {
  const [state, setState] = useState(initalState);
  const [pending, startTransition] = useTransition();
  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: ShowOptionalDefaultsSchema,
    defaultValues: {
      url: null,
    },
  });

  const { register } = form;

  function submitForm(values: ShowOptionalDefaults) {
    startTransition(async () => {
      const res = await add(values);
      setState(res);
    });
    form.reset();
    form.clearErrors();
  }

  return (
    <Modal
      id='show-modal'
      buttonLabel='Add Show'
      onClick={() => {
        form.clearErrors();
        form.reset();
      }}
      onClose={() => form.reset()}
      ok={
        <Button
          className={cn({
            loading: pending,
            'btn-error': state.error,
            'btn-success': state.message === 'Success',
          })}
          size='sm'
          form='show-form'
          type='submit'
        >
          Add
        </Button>
      }
    >
      <h3 className='text-lg font-bold'>Enter Show Information</h3>

      <Form
        form={form}
        onSubmit={submitForm}
        id='show-form'
      >
        <div className='flex w-full gap-5'>
          <Input
            className='input input-bordered input-primary w-full md:input-sm'
            placeholder='Enter show name'
            label='Show Name*'
            {...register('showName')}
          />

          <Select
            className='w-fit'
            label='Show Type*'
            {...register('showType')}
          >
            {Object.keys(ShowTypeSchema.enum).map(type => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </Select>
        </div>

        <div className='mt-2 grid grid-flow-col'>
          <ControlledDatePicker
            name='showDate'
            placeholderText='Start Date'
          />

          <ControlledDatePicker
            name='showEndDate'
            placeholderText='End Date'
          />
        </div>

        <Input
          placeholder='Registration Link'
          label='Registration Link'
          {...register('url')}
        />

        <Alert
          message={state.message}
          visible={state.error}
        />
      </Form>
    </Modal>
  );
}

export default AddNewShow;
