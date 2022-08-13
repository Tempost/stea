import { trpc } from '@/utils/trpc';
import _ from 'lodash';

import TableWithData from './tablewithdata';

import type { NonMemberHorseOwner } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

function OwnerTable() {
  const owners = trpc.useQuery(['nonMemberHorseOwner.get-owners']);

  const ownerCols = useMemo<ColumnDef<NonMemberHorseOwner>[]>(
    () => [
      {
        header: 'Horse Owners',
        columns: [
          {
            accessorKey: 'createdAt',
            id: 'createdAt',
            cell: info => {
              const date: Date = info.getValue();
              if (_.isNull(date)) return 'N/A';

              return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
            },
            header: () => <span> Registration Date </span>,
          },
          {
            accessorKey: 'fullName',
            id: 'fullName',
            cell: info => info.getValue(),
            header: () => <span> Name </span>,
          },
          {
            accessorKey: 'email',
            id: 'email',
            cell: info => info.getValue(),
            header: () => <span> Email </span>,
          },
          {
            accessorKey: 'phone',
            id: 'phone',
            cell: info => info.getValue(),
            header: () => <span> Phone </span>,
          },
        ],
      },
    ],
    []
  );

  return (
    <TableWithData
      colDef={ownerCols}
      query={owners}
      paginate={true}
    />
  );
}

export default OwnerTable;
