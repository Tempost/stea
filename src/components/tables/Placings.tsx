'use client';

import TableWithData from './BaseTable';

import ShowYearFilter from '@/components/tables/ShowYearFilter';
import { RiderComboPlacings } from '@/server/prisma/queries/riders';
import {
  ColumnDef,
  flexRender,
  getExpandedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Fragment, useMemo } from 'react';

interface PlacingsTableProps {
  title?: string;
  search?: boolean;
  paginate?: boolean;
  riders: Array<RiderComboPlacings>;
}

const currYear = new Date().getFullYear();

function PlacingsTable({ title, riders, ...props }: PlacingsTableProps) {
  const columns: Array<ColumnDef<RiderComboPlacings>> = useMemo(
    () => [
      {
        id: 'header',
        header: ({ table }) => {
          return (
            <div className='flex space-x-1'>
              <span>{title ?? 'Riders'}</span>
              <ShowYearFilter column={table.getColumn('showYear')} />
            </div>
          );
        },
        columns: [
          {
            accessorKey: 'division',
            id: 'division',
            cell: info => info.getValue(),
            header: () => <span> Division </span>,
          },
          {
            accessorKey: 'member.memberStatusType',
            id: 'memberStatusType',
            cell: info => {
              const statusType = info.getValue();
              if (statusType === 'AdultAmateur') {
                return 'Adult Amateur';
              }

              return statusType;
            },
            header: () => <span> Member Type </span>,
          },
          {
            accessorKey: 'member.fullName',
            id: 'member.fullName',
            cell: info => info.getValue(),
            header: () => <span> Rider </span>,
          },
          {
            accessorKey: 'horse.horseRN',
            id: 'horse.horseRN',
            cell: info => info.getValue(),
            header: () => <span> Horse </span>,
          },
          {
            accessorKey: 'totalPoints',
            id: 'totalPoints',
            cell: info => info.getValue(),
            header: () => <span> Points </span>,
          },
          {
            accessorKey: 'totalShows',
            id: 'totalShows',
            cell: info => info.getValue(),
            header: () => <span> Shows Attended </span>,
          },
          {
            accessorKey: 'showYear',
            id: 'showYear',
            filterFn: 'equals',
          },
        ],
      },
    ],
    [title],
  );
  console.dir(riders, { depth: 400 });

  return (
    <TableWithData
      extraTableOpts={{
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        initialState: {
          columnVisibility: {
            showYear: false,
          },
          columnFilters: [{ id: 'showYear', value: currYear }],
        },
      }}
      rowRender={row => (
        <Fragment key={row.id}>
          <tr className='hover:bg-base-200'>
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
        </Fragment>
      )}
      data={riders}
      {...props}
    />
  );
}

export default PlacingsTable;
