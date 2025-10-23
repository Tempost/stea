'use client';
import Form from '@/components/form/Form';
import { Button } from '@/components/styled-ui/Button';
import TableWithData from '@/components/tables/BaseTable';
import { BoardmemberSchema } from '@/server/prisma/zod-generated/modelSchema/BoardmemberSchema';
import { mapping } from '@/server/utils';
import { cn } from '@/utils/helpers';
import useZodForm from '@/utils/usezodform';
import { Boardmember } from '@prisma/client';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { useEffect, useState, useTransition } from 'react';
import { ActionState, update } from './actions';

const columns: Array<ColumnDef<Boardmember>> = [
  {
    header: 'Board Members',
    columns: [
      {
        accessorKey: 'name',
        id: 'name',
        cell: info => info.getValue(),
        header: () => <span> Name </span>,
      },
      {
        accessorKey: 'email',
        id: 'email',
        cell: info => info.getValue(),
        header: () => <span> Email </span>,
      },
      {
        accessorKey: 'position',
        id: 'position',
        cell: info => mapping[info.getValue() as Boardmember['position']],
        header: () => <span> Position </span>,
      },
    ],
  },
];

interface ModalProps {
  boardMember: Boardmember | undefined;
}

const initialState: ActionState = {
  message: '',
  error: false,
};

function BoardmemberModal({ boardMember }: ModalProps) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState(initialState);

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: BoardmemberSchema,
    values: boardMember,
  });

  useEffect(() => {}, [boardMember]);

  return (
    <dialog
      id='boardmember-update'
      className='modal modal-bottom sm:modal-middle transition-all delay-75'
    >
      <div className='modal-box overflow-visible'>
        <Form
          form={form}
          id='boardmember-form'
          onSubmit={formValue => {
            startTransition(async () => {
              const res = await update(formValue);
              setState(res);
            });
          }}
        >
          <legend className='fieldset-legend text-lg font-bold'>
            {mapping[form.getValues().position]}
          </legend>

          <fieldset
            id='boardmember'
            className='space-y-3'
          >
            <Form.Input
              label='Name'
              {...form.register('name')}
            />
            <Form.Input
              label='Email'
              {...form.register('email')}
            />
          </fieldset>
        </Form>

        <div className='modal-action'>
          <Button
            form='boardmember-form'
            type='submit'
            size='sm'
            className={cn({
              loading: pending,
              'btn-success': state.message === 'Success',
            })}
          >
            Ok
          </Button>
          <label
            htmlFor='boardmember-modal'
            className='btn btn-sm'
            onClick={() => {
              form.reset();
              setState(initialState);
              const dialog = document.getElementById(
                'boardmember-update',
              ) as HTMLDialogElement;
              dialog.close();
            }}
          >
            Close
          </label>
        </div>
      </div>

      <form
        method='dialog'
        className='modal-backdrop'
      >
        <button></button>
      </form>
    </dialog>
  );
}

function BoardMembers({ boardmembers }: { boardmembers: Array<Boardmember> }) {
  const [values, setValues] = useState<Boardmember | undefined>(undefined);

  return (
    <>
      <BoardmemberModal boardMember={values} />
      <div className='mx-auto w-fit'>
        <TableWithData
          extraTableOpts={{
            columns,
            enableRowSelection: true,
          }}
          data={boardmembers}
          rowRender={({ row }) => (
            <tr
              className='hover:bg-base-200'
              onClick={e => {
                e.preventDefault();
                setValues(row.original);

                const dialog = document.getElementById(
                  'boardmember-update',
                ) as HTMLDialogElement;
                dialog.showModal();
              }}
            >
              {row.getVisibleCells().map(cell => {
                return (
                  <td
                    key={cell.id}
                    className={
                      'text-base-content px-2 py-2 text-xs font-normal whitespace-nowrap md:px-2 md:py-2 lg:text-sm'
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          )}
        />
      </div>
    </>
  );
}

export default BoardMembers;
