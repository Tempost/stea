import { trpc } from '@/utils/trpc';
import _ from 'lodash';

import TableWithData from './tablewithdata';

import type { Horse } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

function HorseTable() {
  const horses = trpc.useQuery(['horse.get-horses']);

  const memberCols = useMemo<ColumnDef<Horse>[]>(
    () => [
      {
        header: 'Horses',
        columns: [
          {
            accessorKey: 'registrationDate',
            id: 'registrationDate',
            cell: info => {
              const date: Date = info.getValue();
              if (_.isNull(date)) return 'N/A';

              return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
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
      colDef={memberCols}
      query={horses}
      paginate={true}
    />
  );
}

export default HorseTable;
