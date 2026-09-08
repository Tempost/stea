// TODO: No longer shared. Can be moved to member-horse page dir
'use client';
import { Member } from '@/server/prisma/queries/args';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

interface MemberTableProps {
  overRideDefaultCols?: Array<ColumnDef<Member>>;
  search?: boolean;
  paginate?: boolean;
  members: Array<Member>;
}

const columns: Array<ColumnDef<Member>> = [
  {
    header: 'Members',
    columns: [
      {
        accessorKey: 'fullName',
        id: 'fullName',
        cell: info => info.getValue(),
        header: () => <span> Name </span>,
      },
      {
        accessorKey: 'memberStatusType',
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
        accessorKey: 'memberStatus',
        id: 'memberStatus',
        cell: info => info.getValue(),
        header: () => <span> Status </span>,
      },
    ],
  },
];

function MemberTable({ members, ...props }: MemberTableProps) {
  return (
    <TableWithData
      extraTableOpts={{
        columns,
      }}
      data={members}
      {...props}
    />
  );
}

export default MemberTable;
