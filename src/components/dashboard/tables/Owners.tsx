import { RouterOutputs, trpc } from '@/utils/trpc';
import { readableDateTime } from '@/utils/helpers';
import type { ColumnDef } from '@tanstack/react-table';
import TableWithData from '@/components/tables/BaseTable';

type Owner = RouterOutputs['nonMemberHorseOwners']['all'][number];

function DashboardOwners() {
  const owners = trpc.nonMemberHorseOwners.all.useQuery({
    select: {
      fullName: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });

  const defaultCols: ColumnDef<Owner>[] = [
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
  ];

  return (
    <TableWithData
      colDef={defaultCols}
      query={owners}
      paginate
      search
    />
  );
}

export default DashboardOwners;
