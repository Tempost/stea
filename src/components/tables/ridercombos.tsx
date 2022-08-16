import { useMemo } from 'react';
import { trpc } from '@/utils/trpc';

import TableWithData from './tablewithdata';

import type { CompleteRiderCombo } from '@/backend/prisma/zod';
import type { ColumnDef } from '@tanstack/react-table';

interface RidersTableProps {
  overRideDefaultCols?: ColumnDef<CompleteRiderCombo>[];
}

function RidersTable({ overRideDefaultCols }: RidersTableProps) {
  const riders = trpc.useQuery(['rider.get-riders']);

  const defaultCols = useMemo<ColumnDef<CompleteRiderCombo>[]>(
    () => [
      {
        header: 'Riders',
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
          {
            accessorKey: 'points.totalPoints',
            id: 'point.totalPointss',
            cell: info => info.getValue(),
            header: () => <span> Points </span>,
          },
          {
            accessorKey: 'points.totalShows',
            id: 'point.totalShows',
            cell: info => info.getValue(),
            header: () => <span> Shows Attended </span>,
          },
        ],
      },
    ],
    []
  );

  return (
    <TableWithData
      colDef={overRideDefaultCols ?? defaultCols}
      query={riders}
      paginate={true}
    />
  );
}

export default RidersTable;
