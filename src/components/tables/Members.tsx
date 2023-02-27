import { RouterOutputs, trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type Member = RouterOutputs['members']['all'][number];
interface MemberTableProps {
  overRideDefaultCols?: ColumnDef<Member>[];
  search?: true;
}

const defaultCols: ColumnDef<Member>[] = [
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

function MemberTable({ overRideDefaultCols, search }: MemberTableProps) {
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
      colDef={overRideDefaultCols ?? defaultCols}
      query={members}
      paginate={true}
      search={search}
    />
  );
}

export default MemberTable;
