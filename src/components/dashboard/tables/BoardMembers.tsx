import TableWithData from '@/components/tables/BaseTable';
import { RouterOutputs, trpc } from '@/utils/trpc';
import { ColumnDef, flexRender, RowSelectionState } from '@tanstack/react-table';
import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';

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
        cell: info => info.getValue(),
        header: () => <span> Position </span>,
      },
    ],
  },
];

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  rowSelection: RowSelectionState | undefined;
  setRowSelection: Dispatch<SetStateAction<object>>;
}

function BoardmemberModal({ isOpen, setIsOpen, rowSelection, setRowSelection }: ModalProps) {
  return (
    <div
      className={`modal modal-bottom ${
        isOpen ? 'modal-open' : ''
      } transition-all delay-75 sm:modal-middle`}
    >
      <div className='modal-box overflow-visible'>
        <div className='modal-action'>
          <button className='btn-sm btn'>Ok</button>

          <label
            htmlFor='boardmember-modal'
            className='btn-sm btn'
            onClick={() => {
              setRowSelection({});
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
  const [rowSelection, setRowSelection] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const boardmembers = trpc.boardmember.all.useQuery();

  return (
    <>
      <BoardmemberModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <div className='w-fit mx-auto'>
        <TableWithData
          extraTableOpts={{
            columns,
            enableRowSelection: true,
            onRowSelectionChange: setRowSelection,
            state: { rowSelection },
          }}
          query={boardmembers}
          rowRender={({ row }) => (
            <tr
              className='border-b bg-white transition duration-300 ease-in-out hover:bg-primary/10'
              onClick={e => {
                e.preventDefault();
                setRowSelection(row.original);
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
