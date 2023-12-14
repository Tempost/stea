import TableWithData from '@/components/tables/BaseTable';
import { RouterOutputs, trpc } from '@/utils/trpc';
import type { ColumnDef } from '@tanstack/react-table';

type Boardmembers = RouterOutputs['boardmember']['all'][number];

function BoardMembers() {
  const boardmembers = trpc.boardmember.all.useQuery();

  const defaultCols: Array<ColumnDef<Boardmembers>> = [
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

  return (
    <div className='w-fit mx-auto'>
      <TableWithData
        extraTableOpts={{
          columns: defaultCols,
          enableRowSelection: true,
        }}
        query={boardmembers}
      />
    </div>
  );
}

export default BoardMembers;
