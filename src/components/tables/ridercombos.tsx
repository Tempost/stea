import { trpc } from '@/utils/trpc';
import _ from 'lodash';

import TableWithData from './tablewithdata';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CompleteRiderCombo } from '@/backend/prisma/zod';

function RidersTable() {
  const riders = trpc.useQuery(['rider.get-riders']);

  const riderCols = useMemo<ColumnDef<CompleteRiderCombo>[]>(
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
      colDef={riderCols}
      query={riders}
      paginate={true}
    />
  );
}

export default RidersTable;
