import { RouterOutputs, trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type Horse = RouterOutputs['horses']['all'][number];

interface HorseTableProps {
  overRideDefaultCols?: Array<ColumnDef<Horse>>;
  search?: boolean;
  paginate?: boolean;
}

const defaultCols: Array<ColumnDef<Horse>> = [
  {
    header: 'Horses',
    columns: [
      {
        accessorKey: 'horseRN',
        id: 'horseRN',
        cell: info => info.getValue(),
        header: () => <span> Registered Name </span>,
      },
      {
        accessorKey: 'regType',
        id: 'regType',
        cell: info => info.getValue(),
        header: () => <span> Status </span>,
      },
      {
        accessorFn: horseRec => {
          return horseRec.memberName ?? horseRec.owner;
        },
        id: 'owner',
        cell: info => info.getValue(),
        header: () => <span> Owner </span>,
      },
    ],
  },
];

function HorseTable({ overRideDefaultCols, ...props }: HorseTableProps) {
  const horses = trpc.horses.all.useQuery();

  return (
    <TableWithData
      extraTableOpts={{
        columns: overRideDefaultCols ?? defaultCols,
      }}
      query={horses}
      {...props}
    />
  );
}

export default HorseTable;
