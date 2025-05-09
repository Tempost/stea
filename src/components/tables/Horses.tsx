'use client';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';
import { Horse } from '@prisma/client';

interface HorseTableProps {
  overRideDefaultCols?: Array<ColumnDef<Horse>>;
  search?: boolean;
  paginate?: boolean;
  horses: Array<Horse>;
}

const columns: Array<ColumnDef<Horse>> = [
  {
    header: 'Horses',
    columns: [
      {
        accessorKey: 'horseRN',
        id: 'horseRN',
        cell: info => info.getValue(),
        header: () => <span> Registered Name </span>,
      },
      {
        accessorKey: 'regType',
        id: 'regType',
        cell: info => info.getValue(),
        header: () => <span> Status </span>,
      },
      {
        accessorFn: horseRec => {
          return horseRec.memberName ?? horseRec.owner;
        },
        id: 'owner',
        cell: info => info.getValue(),
        header: () => <span> Owner </span>,
      },
    ],
  },
];

function HorseTable({ horses, ...props }: HorseTableProps) {
  return (
    <TableWithData
      extraTableOpts={{
        columns: columns,
      }}
      data={horses}
      {...props}
    />
  );
}

export default HorseTable;
