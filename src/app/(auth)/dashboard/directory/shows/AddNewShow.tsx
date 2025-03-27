import Form from '@/components/form/Form';
import { optionsFromObject } from '@/components/helpers';
import Alert from '@/components/styled-ui/Alert';
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
import { ActionState, add } from './action';

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
      <Form
        form={form}
        onSubmit={submitForm}
        id='show-form'
      >
        <legend className='fieldset-legend text-lg font-bold'>
          Enter Show Information
        </legend>

        <fieldset className='fieldset flex w-full gap-2'>
          <Form.Input
            label='Show Name*'
            {...register('showName')}
          />

          <Form.Select
            className='w-full'
            label='Show Type*'
            defaultValue=''
            {...register('showType')}
          >
            <option
              disabled
              value=''
            >
              Select
            </option>
            {optionsFromObject(ShowTypeSchema.enum)}
          </Form.Select>
        </fieldset>

        <fieldset className='flex w-full gap-2'>
          <Form.Input
            label='Start Date'
            type='date'
            className='w-fit'
            {...register('showDate')}
          />

          <Form.Input
            label='End Date'
            type='date'
            className='w-fit'
            {...register('showEndDate')}
          />
        </fieldset>

        <Form.Input
          placeholder='Registration Link'
          label='Registration Link'
          type='url'
          {...register('url')}
        />

        <Alert
          icon='error'
          message={state.message}
          hidden={state.error}
        />
      </Form>
    </Modal>
  );
}

export default AddNewShow;
