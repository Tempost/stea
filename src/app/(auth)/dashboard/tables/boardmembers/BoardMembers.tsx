'use client';
import Input from '@/components/data-entry/Input';
import Form from '@/components/forms/Form';
import TableWithData from '@/components/tables/BaseTable';
import { mapping } from '@/server/utils';
import useZodForm from '@/utils/usezodform';
import { BoardmemberSchema } from '@/server/prisma/zod-generated/modelSchema/BoardmemberSchema';
import { Boardmember } from '@prisma/client';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ActionState, update } from './actions';
import { Button } from '@/components/styled-ui/Button';
import { cn } from '@/utils/helpers';

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
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  form: UseFormReturn<Boardmember>;
}

const initialState: ActionState = {
  message: '',
  error: false,
};

function BoardmemberModal({ isOpen, setIsOpen, form }: ModalProps) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState(initialState);

  return (
    <div
      className={`modal modal-bottom ${
        isOpen ? 'modal-open' : ''
      } transition-all delay-75 sm:modal-middle`}
    >
      <div className='modal-box overflow-visible'>
        <h3 className='text-lg font-bold'>
          {mapping[form.getValues().position]}
        </h3>

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
          <Input
            label='Name'
            {...form.register('name')}
          />
          <Input
            label='Email'
            {...form.register('email')}
          />
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
              setIsOpen(curr => !curr);
            }}
          >
            Close
          </label>
        </div>
      </div>
    </div>
  );
}

function BoardMembers({ boardmembers }: { boardmembers: Array<Boardmember> }) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: BoardmemberSchema,
  });

  return (
    <>
      <BoardmemberModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        form={form}
      />
      <div className='mx-auto w-fit'>
        <TableWithData
          extraTableOpts={{
            columns,
            enableRowSelection: true,
          }}
          data={boardmembers}
          rowRender={({ row }) => (
            <tr
              className='border-b bg-white transition duration-300 ease-in-out hover:bg-primary/10'
              onClick={e => {
                e.preventDefault();
                Object.entries(row.original).forEach(([key, value]) =>
                  form.setValue(key as keyof Boardmember, value),
                );
                setIsOpen(curr => !curr);
              }}
            >
              {row.getVisibleCells().map(cell => {
                return (
                  <td
                    key={cell.id}
                    className={
                      'whitespace-nowrap px-2 py-2 text-xs font-normal text-gray-900 md:px-2 md:py-2 lg:text-sm'
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
