import Input from '@/components/data-entry/Input';
import Form from '@/components/forms/Form';
import TableWithData from '@/components/tables/BaseTable';
import { Boardmember, BoardmemberSchema } from '@/server/prisma/zod-generated';
import { mapping } from '@/server/utils';
import { RouterOutputs, trpc } from '@/utils/trpc';
import useZodForm from '@/utils/usezodform';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { SetStateAction } from 'jotai';
import { useSession } from 'next-auth/react';
import { Dispatch, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Boardmembers = RouterOutputs['boardmember']['all'][number];
const columns: Array<ColumnDef<Boardmembers>> = [
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

function BoardmemberModal({ isOpen, setIsOpen, form }: ModalProps) {
  const utils = trpc.useContext();
  const add = trpc.boardmember.update.useMutation({
    onSuccess: () => {
      utils.boardmember.invalidate();
      setIsOpen(curr => !curr);
    },
  });

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
            add.mutate(formValue);
          }}
        >
          <Input
            className='input-bordered input-primary input w-full md:input-sm'
            label='Name'
            {...form.register('name')}
          />
          <Input
            className='input-bordered input-primary input w-full md:input-sm'
            label='Email'
            {...form.register('email')}
          />
        </Form>

        <div className='modal-action'>
          <button
            form='boardmember-form'
            type='submit'
            className='btn-sm btn'
          >
            Ok
          </button>
          <label
            htmlFor='boardmember-modal'
            className='btn-sm btn'
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

function BoardMembers() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: BoardmemberSchema,
  });

  const get = trpc.boardmember.all.useQuery();

  return (
    <>
      <BoardmemberModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        form={form}
      />
      <div className='w-fit mx-auto'>
        <TableWithData
          extraTableOpts={{
            columns,
            enableRowSelection: true,
          }}
          query={get}
          rowRender={({ row }) => (
            <tr
              className='border-b bg-white transition duration-300 ease-in-out hover:bg-primary/10'
              onClick={e => {
                if (
                  session.data?.user?.name === 'Cody Diamond' ||
                  session.data?.user?.name === 'Lynette Diamond' ||
                  session.data?.user?.name === 'Laura Sartwelle' ||
                  session.data?.user?.name === 'Markie Owen'
                ) {
                  e.preventDefault();
                  Object.entries(row.original).forEach(([key, value]) =>
                    form.setValue(key as keyof Boardmembers, value)
                  );
                  setIsOpen(curr => !curr);
                }
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
