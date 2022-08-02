import { Member, Horse } from '@prisma/client';
import _ from 'lodash';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { PublicLayout } from '@/components/layout';
import { trpc } from '@/utils/trpc';

const memberCols: ColumnDef<Member>[] = [
  {
    header: 'Members',
    columns: [
      {
        accessorKey: 'fullName',
        id: 'fullName',
        cell: (info) => info.getValue(),
        header: () => <span> Name </span>,
      },
      {
        accessorKey: 'JRSR',
        id: 'JRSR',
        cell: (info) => info.getValue(),
        header: () => <span> Rider Level </span>,
      },
    ],
  },
];

const horseCols: ColumnDef<Horse>[] = [
  {
    header: '2022 Year End Placings.',
    columns: [],
  },
];

function MembersAnHorses() {
  const members = trpc.useQuery(['member.get-members']);

  const table = useReactTable({
    data: members.data as Member[],
    columns: memberCols,
    getCoreRowModel: getCoreRowModel(),
  });

  const TableWithData = () => {
    if (members.isLoading) {
      return <>Loading...</>;
    }

    if (members.isError) {
      return <>Error...</>;
    }

    if (members.data === undefined) {
      return <>Empty...</>;
    }

    return (
      <table className='table table-compact shadow-xl'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='text-center'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='border'>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='divide-x'
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className='pt-28 w-full grid place-items-center'>
      <section>
        <TableWithData />
      </section>
    </div>
  );
}
import { ReactElement } from 'react';
MembersAnHorses.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default MembersAnHorses;
