import { useMemo } from 'react';

import { trpc } from '@/utils/trpc';
import TableWithData from './tablewithdata';

import type { Horse } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

interface HorseTableProps {
  overRideDefaultCols?: ColumnDef<Horse>[];
}

function HorseTable({ overRideDefaultCols }: HorseTableProps) {
  const horses = trpc.useQuery(['horse.get-horses']);

  const defaultCols = useMemo<ColumnDef<Horse>[]>(
    () => [
      {
        header: 'Horses',
        columns: [
          {
            accessorKey: 'registrationDate',
            id: 'registrationDate',
            cell: info => {
              const date: Date = info.getValue();
              if (date === null) return 'N/A';

              return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
            },
            header: () => <span> Registration Date </span>,
          },
          {
            accessorKey: 'horseRN',
            id: 'horseRN',
            cell: info => info.getValue(),
            header: () => <span> Registered Name </span>,
          },
          {
            accessorKey: 'horseAKA',
            id: 'horseAKA',
            cell: info => info.getValue(),
            header: () => <span> Family Name </span>,
          },
          {
            accessorKey: 'owner',
            id: 'owner',
            cell: info => info.getValue(),
            header: () => <span> Owner </span>,
          },
          {
            accessorKey: 'memberName',
            id: 'memberName',
            cell: info => info.getValue(),
            header: () => <span> Member Owner </span>,
          },
          {
            accessorKey: 'regType',
            id: 'regType',
            cell: info => info.getValue(),
            header: () => <span> Status </span>,
          },
        ],
      },
    ],
    []
  );

  return (
    <TableWithData
      colDef={overRideDefaultCols ?? defaultCols}
      query={horses}
      paginate={true}
    />
  );
}

export default HorseTable;
