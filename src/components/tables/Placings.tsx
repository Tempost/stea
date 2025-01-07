'use client';

import TableWithData from './BaseTable';

import { getFilteredRowModel, ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { RiderCombo } from '@prisma/client';
import ShowYearFilter from '@/components/tables/ShowYearFilter';

interface PlacingsTableProps {
  title?: string;
  search?: boolean;
  paginate?: boolean;
  riders: Array<RiderCombo>;
}

const currYear = new Date().getFullYear();

function PlacingsTable({ title, riders, ...props }: PlacingsTableProps) {
  const columns: Array<ColumnDef<RiderCombo>> = useMemo(
    () => [
      {
        id: 'header',
        header: ({ table }) => {
          return (
            <>
              <div>{title ?? 'Riders'}</div>
              <ShowYearFilter column={table.getColumn('showYear')} />
            </>
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

  return (
    <TableWithData
      extraTableOpts={{
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
          columnVisibility: {
            showYear: false,
          },
          columnFilters: [{ id: 'showYear', value: currYear }],
        },
      }}
      data={riders}
      {...props}
    />
  );
}

export default PlacingsTable;
