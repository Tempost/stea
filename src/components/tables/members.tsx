import { useMemo } from 'react';

import { trpc } from '@/utils/trpc';
import TableWithData from './tablewithdata';

import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

interface MemberTableProps {
  overRideDefaultCols?: ColumnDef<Member>[];
}

function MemberTable({ overRideDefaultCols }: MemberTableProps) {
  const members = trpc.useQuery(['member.get-members']);

  const defaultCols = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        header: 'Members',
        columns: [
          {
            accessorKey: 'membershipDate',
            id: 'membershipDate',
            cell: info => {
              const date: Date = info.getValue();

              return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
            },
            header: () => <span> Join Date </span>,
          },
          {
            accessorKey: 'fullName',
            id: 'fullName',
            cell: info => info.getValue(),
            header: () => <span> Name </span>,
          },
          {
            accessorKey: 'JRSR',
            id: 'JRSR',
            cell: info => info.getValue(),
            header: () => <span> Rider Level </span>,
          },
          {
            accessorKey: 'memberStatus',
            id: 'memberStatus',
            cell: info => info.getValue(),
            header: () => <span> Status </span>,
          },
          {
            accessorKey: 'memberType',
            id: 'memberType',
            cell: info => info.getValue(),
            header: () => <span> Type </span>,
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
      colDef={overRideDefaultCols ?? defaultCols}
      query={members}
      paginate={true}
    />
  );
}

export default MemberTable;
