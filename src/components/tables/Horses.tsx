import { useMemo } from 'react';

import { trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { Horse } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { readableDateTime } from '@/utils/helpers';

interface HorseTableProps {
  overRideDefaultCols?: ColumnDef<Horse>[];
  search?: boolean;
}

function HorseTable({ overRideDefaultCols, search }: HorseTableProps) {
  const horses = trpc.horses.all.useQuery();

  const defaultCols = useMemo<ColumnDef<Horse>[]>(
    () => [
      {
        header: 'Horses',
        columns: [
          {
            accessorKey: 'registrationDate',
            id: 'registrationDate',
            cell: info => {
              const date: Date | undefined = info.getValue();

              return date ? readableDateTime(date) : '';
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
      search={search}
    />
  );
}

export default HorseTable;
