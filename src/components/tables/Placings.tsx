'use client';

import TableWithData from './BaseTable';

import ShowYearFilter from '@/components/tables/ShowYearFilter';
import { RiderComboPlacings } from '@/server/prisma/queries/args';
import {
  ColumnDef,
  flexRender,
  getExpandedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Fragment, useMemo } from 'react';
import { ChevDown, ChevRight } from '../icons';

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
            id: 'expand',
            cell: ({ row }) => (row.getIsExpanded() ? ChevDown : ChevRight),
          },
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

  return (
    <TableWithData
      extraTableOpts={{
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => true,
        initialState: {
          columnVisibility: {
            showYear: false,
          },
          columnFilters: [{ id: 'showYear', value: currYear }],
        },
      }}
      rowRender={row => (
        <Fragment key={row.id}>
          <tr
            className='hover:bg-base-200'
            onClick={row.getToggleExpandedHandler()}
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
          {row.getIsExpanded() && (
            <tr>
              <td
                colSpan={row.getVisibleCells().length}
                className='m-0 p-0 pl-20'
              >
                <div className='bg-base-200'>
                  <table className='table-xs table'>
                    <thead>
                      <tr>
                        <th className='text-base-content px-2 py-2 text-xs font-medium'>
                          Show Name
                        </th>
                        <th className='text-base-content px-2 py-2 text-xs font-medium'>
                          Type
                        </th>
                        <th className='text-base-content px-2 py-2 text-xs font-medium'>
                          Place
                        </th>
                        <th className='text-base-content px-2 py-2 text-xs font-medium'>
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {row.original.points.map(p => (
                        <tr
                          key={p.uid}
                          className=''
                        >
                          <td className='text-base-content px-2 py-2 text-xs font-normal whitespace-nowrap md:px-2 md:py-2'>
                            {p.show.showName}
                          </td>
                          <td className='text-base-content px-2 py-2 text-xs font-normal whitespace-nowrap md:px-2 md:py-2'>
                            {p.show.showType}
                          </td>
                          <td className='text-base-content px-2 py-2 text-xs font-normal whitespace-nowrap md:px-2 md:py-2'>
                            {p.place}
                          </td>
                          <td className='text-base-content px-2 py-2 text-xs font-normal whitespace-nowrap md:px-2 md:py-2'>
                            {p.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          )}
        </Fragment>
      )}
      data={riders}
      {...props}
    />
  );
}

export default PlacingsTable;
