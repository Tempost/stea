import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import useZodForm from '@/utils/usezodform';
import { trpc } from '@/utils/trpc';
import { ShowModel } from '@/server/prisma/zod';
import { ControlledDatePicker, Select, Input } from '../data-entry';
import Alert from '../forms/Alert';

const NewShowModel = ShowModel.omit({ uid: true, reviewed: true });
const showTypes = [
  {
    label: 'CT',
    value: 'CT',
  },
  {
    label: 'HT',
    value: 'HT',
  },
  {
    label: 'Derby',
    value: 'Derby',
  },
];

function AddNewShow() {
  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: NewShowModel,
    defaultValues: {
      url: null,
    },
  });

  const {
    register,
    formState: { errors },
  } = methods;
  const utils = trpc.useContext();

  const addNew = trpc.shows.add.useMutation({
    onSuccess() {
      utils.shows.invalidate();
      methods.reset();
      methods.clearErrors();
    },
  });

  function submitForm(values: z.infer<typeof NewShowModel>) {
    addNew.mutate(values);
  }

  return (
    <>
      <label
        htmlFor='my-modal-6'
        className='modal-button btn-primary btn'
      >
        Add Show
      </label>
      <input
        type='checkbox'
        id='my-modal-6'
        className='modal-toggle'
        onClick={() => {
          methods.clearErrors();
          methods.reset();
        }}
      />

      <div className='modal modal-bottom transition-all delay-75 sm:modal-middle'>
        <div className='modal-box overflow-visible'>
          <h3 className='text-lg font-bold'>Enter Show Information</h3>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitForm)}>
              <div className='flex flex-row gap-5'>
                <Input
                  className='input-primary input-sm'
                  placeholder='Enter show name'
                  label='Show Name*'
                  error={errors.showName}
                  {...register('showName', {
                    required: true,
                  })}
                />

                <Select
                  className='select-primary select-sm w-32'
                  label='Show Type*'
                  options={showTypes}
                  {...register('showType', {
                    required: true,
                  })}
                />
              </div>

              <div className='grid grid-flow-col'>
                <ControlledDatePicker
                  name='showDate'
                  label='Show Date*'
                  placeholderText='Show Date'
                  error={errors.showDate}
                />

                <ControlledDatePicker
                  name='showEndDate'
                  label='Ending Date'
                  placeholderText='Ending Date'
                  error={errors.showEndDate}
                />
              </div>

              <Input
                className='input-primary'
                placeholder='Registration Link'
                label='Registration Link'
                error={errors.url}
                {...register('url', { required: false })}
              />

              <Alert
                message={addNew.error?.message}
                visible={addNew.isError}
              />

              <div className='modal-action'>
                <button
                  className={`btn-sm btn ${
                    addNew.isError
                      ? 'btn-error'
                      : addNew.isSuccess
                      ? 'btn-success'
                      : ''
                  }`}
                  type='submit'
                >
                  add
                </button>

                <label
                  htmlFor='my-modal-6'
                  className='btn-sm btn'
                >
                  cancel
                </label>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}

export default AddNewShow;
