import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '@/utils/trpc';
import TableWithData from './tablewithdata';
import type { Show } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { ShowModel } from '@/backend/prisma/zod';
import { ControlledDatePicker, Select, TextInput } from '../data-entry';
import useZodForm from '@/utils/usezodform';

interface ShowTableProps {
  overRideDefaultCols?: ColumnDef<Show>[];
}

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
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const addNew = trpc.useMutation(['shows.add']);

  function submitForm(values: z.infer<typeof NewShowModel>) {
    console.log(values);
    addNew.mutate(values);
  }

  return (
    <>
      <label
        htmlFor='my-modal-6'
        className='btn btn-primary modal-button'
      >
        Add Show
      </label>
      <input
        type='checkbox'
        id='my-modal-6'
        className='modal-toggle'
        onClick={() => {
          methods.reset();
        }}
      />

      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box overflow-visible'>
          <h3 className='font-bold text-lg'>Enter Show Information</h3>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitForm)}>
              <div className='flex flex-row gap-5'>
                <TextInput
                  className='input-primary'
                  placeholder='Enter show name'
                  label='Show Name*'
                  error={errors.showName}
                  {...register('showName', {
                    required: true,
                  })}
                />

                <Select
                  className='select-primary w-32'
                  label='Show Type*'
                  options={showTypes}
                  {...register('showType', {
                    required: true,
                  })}
                />
              </div>

              <ControlledDatePicker
                label='Show Date*'
                placeholderText='Show Date'
                register={register('showDate', {
                  required: true,
                })}
              />

              <div className='modal-action'>
                <button
                  className='btn btn-sm'
                  type='submit'
                >
                  add
                </button>

                <label
                  htmlFor='my-modal-6'
                  className='btn btn-sm'
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

function ShowsTable({ overRideDefaultCols }: ShowTableProps) {
  const shows = trpc.useQuery(['shows.get-shows']);

  const defaultCols = useMemo<ColumnDef<Show>[]>(
    () => [
      {
        header: 'Shows',
        columns: [
          {
            accessorKey: 'showDate',
            id: 'showDate',
            cell: info => {
              const date: Date = info.getValue();
              if (date === null) return 'N/A';

              return `${
                date.getMonth() + 1
              }/${date.getDate()}/${date.getFullYear()}`;
            },
            header: () => <span> Show Date </span>,
          },
          {
            accessorKey: 'showName',
            id: 'showName',
            cell: info => info.getValue(),
            header: () => <span> Show Name </span>,
          },
          {
            accessorKey: 'showType',
            id: 'showType',
            cell: info => info.getValue(),
            header: () => <span> Type </span>,
          },
          {
            accessorKey: 'riders',
            id: 'riders',
            cell: info => info.getValue().length,
            header: () => <span> Attendee count </span>,
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <AddNewShow />
      <TableWithData
        colDef={overRideDefaultCols ?? defaultCols}
        query={shows}
        paginate={true}
      />
    </>
  );
}

export default ShowsTable;
