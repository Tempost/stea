import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import useZodForm from '@/utils/usezodform';
import { trpc } from '@/utils/trpc';
import { ShowModel } from '@/server/prisma/zod';
import { ControlledDatePicker, Select, Input } from '../data-entry';
import Alert from '../forms/Alert';
import { ShowType } from '@prisma/client';

const NewShowModel = ShowModel.omit({ uid: true, reviewed: true });

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

  const { register } = methods;
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
                  {...register('showName', {
                    required: true,
                  })}
                />

                <Select
                  className='select-primary select-sm w-32'
                  label='Show Type*'
                  {...register('showType', {
                    required: true,
                  })}
                >
                  {Object.keys(ShowType).map(type => (
                    <option
                      key={type}
                      value={type}
                    >
                      {ShowType[type as ShowType]}
                    </option>
                  ))}
                </Select>
              </div>

              <div className='grid grid-flow-col'>
                <ControlledDatePicker
                  name='showDate'
                  label='Show Date*'
                  placeholderText='Show Date'
                />

                <ControlledDatePicker
                  name='showEndDate'
                  placeholderText='Ending Date'
                />
              </div>

              <Input
                className='input-primary'
                placeholder='Registration Link'
                label='Registration Link'
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
