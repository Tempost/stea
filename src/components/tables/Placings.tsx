import { RouterOutputs, trpc } from '@/utils/trpc';

import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

type RiderCombo = RouterOutputs['riders']['all'][number];
interface PlacingsTableProps {
  title?: string;
  search?: boolean;
}

const years = Array.from({ length: 10 }, (_, i) => i + 2023);
const currYear = new Date().getFullYear();

function PlacingsTable({ title, search }: PlacingsTableProps) {
  const [yearSelect, setYearSelect] = useState(currYear);

  const riders = trpc.riders.all.useQuery({
    where: {
      showYear: yearSelect,
    },
    orderBy: [
      {
        division: 'desc',
      },
      {
        member: {
          memberStatusType: 'asc',
        },
      },
      {
        totalPoints: 'desc',
      },
    ],
    select: {
      member: {
        select: {
          fullName: true,
          memberStatusType: true,
        },
      },
      horse: {
        select: {
          horseRN: true,
        },
      },
      shows: true,
      totalPoints: true,
      totalShows: true,
      division: true,
      showYear: true,
    },
  });

  const defaultCols: Array<ColumnDef<RiderCombo>> = [
    {
      header: title ?? 'Riders',
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
      ],
    },
  ];

  return (
    <TableWithData
      colDef={defaultCols}
      query={riders}
      search={search}
      extras={
        <select
          name='show-year'
          id='show-year'
          className='select-bordered select-primary select w-fit select-xs ml-2'
          value={yearSelect}
          onChange={e => {
            e.preventDefault();
            setYearSelect(Number.parseInt(e.target.value));
          }}
        >
          {years.map(year => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>
      }
      paginate
    />
  );
}

export default PlacingsTable;
