import { RouterOutputs, trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type Member = RouterOutputs['members']['all'][number];
interface MemberTableProps {
  overRideDefaultCols?: Array<ColumnDef<Member>>;
  search?: boolean;
  paginate?: boolean;
}

const defaultCols: Array<ColumnDef<Member>> = [
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

function MemberTable({ overRideDefaultCols, ...props }: MemberTableProps) {
  const members = trpc.members.all.useQuery({
    select: {
      fullName: true,
      memberStatusType: true,
      memberStatus: true,
    },
    orderBy: {
      memberStatusType: 'asc',
    },
  });

  return (
    <TableWithData
      extraTableOpts={{
        columns: overRideDefaultCols ?? defaultCols,
      }}
      query={members}
      {...props}
    />
  );
}

export default MemberTable;
