'use client';
import { readableDateTime } from '@/utils/helpers';
import type { ColumnDef } from '@tanstack/react-table';
import TableWithData from '@/components/tables/BaseTable';
import { NonMemberHorseOwner } from '@prisma/client';

const columns: Array<ColumnDef<NonMemberHorseOwner>> = [
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
        header: () => <span> Join Date </span>,
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
];

function DashboardOwners({ owners }: { owners: Array<NonMemberHorseOwner> }) {
  return (
    <TableWithData
      extraTableOpts={{
        columns,
      }}
      data={owners}
      paginate
      search
    />
  );
}

export default DashboardOwners;
