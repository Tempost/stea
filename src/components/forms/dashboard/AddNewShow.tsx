import useZodForm from '@/utils/usezodform';
import { trpc } from '@/utils/trpc';
import Alert from '@/components/forms/Alert';
import Form from '@/components/forms/Form';
import {
  ShowOptionalDefaults,
  ShowOptionalDefaultsSchema,
} from '@/server/prisma/zod-generated/modelSchema/ShowSchema';
import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import ControlledDatePicker from '@/components/data-entry/Date';
import { ShowTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowTypeSchema';
import Modal from '@/components/styled-ui/Modal';

function AddNewShow() {
  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: ShowOptionalDefaultsSchema,
    defaultValues: {
      url: null,
    },
  });

  const { register } = form;
  const utils = trpc.useContext();

  const addNew = trpc.shows.add.useMutation({
    onSuccess() {
      utils.shows.invalidate();
      form.reset();
      form.clearErrors();
    },
  });

  function submitForm(values: ShowOptionalDefaults) {
    addNew.mutate(values);
  }

  return (
    <Modal
      buttonLabel='Add Show'
      onClick={() => {
        form.clearErrors();
        form.reset();
      }}
      ok={
        <button
          className={`btn-sm btn
            ${addNew.isError
              ? 'btn-error'
              : addNew.isSuccess
                ? 'btn-success'
                : ''
            }`}
          form='show-form'
          type='submit'
        >
          Add
        </button>
      }
    >
      <h3 className='text-lg font-bold'>Enter Show Information</h3>

      <Form
        form={form}
        onSubmit={submitForm}
        id='show-form'
      >
        <div className='flex flex-row gap-5'>
          <Input
            className='input-bordered input-primary input w-full md:input-sm'
            placeholder='Enter show name'
            label='Show Name*'
            {...register('showName')}
          />

          <Select
            className='select-bordered select-primary select w-fit md:select-sm'
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

        <div className='grid grid-flow-col'>
          <ControlledDatePicker
            name='showDate'
            label='Show Date*'
            placeholderText='Start Date'
          />

          <ControlledDatePicker
            name='showEndDate'
            placeholderText='End Date'
          />
        </div>

        <Input
          className='input-bordered input-primary input w-full md:input-sm'
          placeholder='Registration Link'
          label='Registration Link'
          {...register('url')}
        />

        <Alert
          message={addNew.error?.message}
          visible={addNew.isError}
        />
      </Form>
    </Modal>
  );
}

export default AddNewShow;
