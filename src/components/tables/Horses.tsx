import { RouterOutputs, trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type Horse = RouterOutputs['horses']['all'][number];

interface HorseTableProps {
  overRideDefaultCols?: ColumnDef<Horse>[];
  search?: boolean;
}

const defaultCols: ColumnDef<Horse>[] = [
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

function HorseTable({ overRideDefaultCols, search }: HorseTableProps) {
  const horses = trpc.horses.all.useQuery();

  return (
    <TableWithData
      colDef={overRideDefaultCols ?? defaultCols}
      query={horses}
      paginate={true}
      search={search}
    />
  );
}

export default HorseTable;
