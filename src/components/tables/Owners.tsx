import { trpc } from '@/utils/trpc';

import TableWithData from './BaseTable';

import type { NonMemberHorseOwner } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { readableDateTime } from '@/utils/helpers';

interface OwnerTableProps {
  search?: boolean;
}

function OwnerTable({ search }: OwnerTableProps) {
  const owners = trpc.nonMemberHorseOwners.all.useQuery();

  const ownerCols = useMemo<ColumnDef<NonMemberHorseOwner>[]>(
    () => [
      {
        header: 'Horse Owners',
        columns: [
          {
            accessorKey: 'createdAt',
            id: 'createdAt',
            cell: info => {
              const date: Date | undefined = info.getValue();

              return date ? readableDateTime(date) : '';
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
      search={search}
    />
  );
}

export default OwnerTable;
