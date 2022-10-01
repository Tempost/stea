import { useMemo } from 'react';
import { inferQueryOutput, trpc } from '@/utils/trpc';

import TableWithData from './tablewithdata';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = inferQueryOutput<'rider.get-riders'>[number];

interface RidersTableProps {
  title?: string;
  overRideDefaultCols?: ColumnDef<RiderCombo>[];
  search?: boolean;
}

function RidersTable({ title, overRideDefaultCols, search }: RidersTableProps) {
  const riders = trpc.useQuery(['rider.get-riders']);

  const defaultCols = useMemo<ColumnDef<RiderCombo>[]>(
    () => [
      {
        header: title ?? 'Riders',
        columns: [
          {
            accessorKey: 'horseName',
            id: 'horseName',
            cell: info => info.getValue(),
            header: () => <span> Horse </span>,
          },
          {
            accessorKey: 'memberName',
            id: 'memberName',
            cell: info => info.getValue(),
            header: () => <span> Rider </span>,
          },
        ],
      },
    ],
    [title]
  );

  return (
    <TableWithData
      colDef={overRideDefaultCols ?? defaultCols}
      query={riders}
      paginate={true}
      search={search}
    />
  );
}

export default RidersTable;
