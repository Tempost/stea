import { RouterOutputs, trpc } from '@/utils/trpc';

import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';
import { readableDateTime } from '@/utils/helpers';

type Owner = RouterOutputs['nonMemberHorseOwners']['all'][number];
const columns: Array<ColumnDef<Owner>> = [
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

interface OwnerTableProps {
  search?: boolean;
  paginate?: boolean;
}

function OwnerTable(props: OwnerTableProps) {
  const owners = trpc.nonMemberHorseOwners.all.useQuery({
    select: {
      fullName: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });

  return (
    <TableWithData
      extraTableOpts={{ columns }}
      query={owners}
      {...props}
    />
  );
}

export default OwnerTable;
