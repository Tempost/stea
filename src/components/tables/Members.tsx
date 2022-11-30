import { useMemo } from 'react';

import { trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { readableDateTime } from '@/utils/helpers';

interface MemberTableProps {
  overRideDefaultCols?: ColumnDef<Member>[];
  search?: true;
}

function MemberTable({ overRideDefaultCols, search }: MemberTableProps) {
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
              const date: Date | undefined = info.getValue();

              return date ? readableDateTime(date) : '';
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
            accessorKey: 'memberStatusType',
            id: 'MemberStatusType',
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
          {
            accessorKey: 'firstName',
            id: 'firstName',
            cell: info => info.getValue(),
            header: () => <span> Contact </span>,
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
      search={search}
    />
  );
}

export default MemberTable;
