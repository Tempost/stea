import { trpc } from '@/utils/trpc';

import TableWithData from "./tablewithdata";

import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

function MemberTable() {
  const members = trpc.useQuery(['member.get-members']);

  const memberCols = useMemo<ColumnDef<Member>[]>(() => [
    {
      header: 'Members',
      columns: [
        {
          accessorKey: 'membershipDate',
          id: 'membershipDate',
          cell: info => {
            const date: Date = info.getValue();

            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
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
      ],
    },
  ], []);

  return (
    <>
      <TableWithData
        colDef={memberCols}
        query={members}
        paginate={true}
      />
    </>
  );
}

export default MemberTable;
