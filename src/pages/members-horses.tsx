import { Member, Horse } from '@prisma/client';
import { trpc } from '@/utils/trpc';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const memberCols: ColumnDef<Member>[] = [
  {
    header: 'Members',
    columns: [
      {
        accessorKey: 'name',
        id: 'name',
        cell: info => info.getValue(),
        header: () => <span> Name </span>,
      },
      {
        accessorKey: 'riderLevel',
        id: 'riderLevel',
        cell: info => info.getValue(),
        header: () => <span> Rider Level </span>
      }
    ]
  }
];

const horseCols: ColumnDef<Horse>[] = [
  {
    header: '2022 Year End Placings.',
    columns: [

    ]
  }
];

function MembersAnHorses() {
  const members = trpc.useQuery(['member.get-members']).data;
  console.log(members)

  const table = useReactTable({
    data: members as Member[],
    columns: memberCols,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='pt-28 w-full grid place-items-center'>
      <section>
        <table className='table table-compact shadow-xl'>
          <thead>
            {
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map(header => (
                      <th key={header.id} colSpan={header.colSpan} className='text-center'>
                        {
                          header.isPlaceholder ? null :
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                        }
                      </th>
                    ))
                  }
                </tr>
              ))}
          </thead>
          <tbody className='border'>
            {
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className='divide-x'>
                  {
                    row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default MembersAnHorses;
