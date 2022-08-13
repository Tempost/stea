import { trpc } from '@/utils/trpc';
import _ from 'lodash';

import TableWithData from './tablewithdata';

import type { TotalPoints } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

function PointsTable() {
  const points = trpc.useQuery(['ranking.get-points']);
  console.log(points.data);

  const ownerCols = useMemo<ColumnDef<TotalPoints>[]>(
    () => [
      {
        header: 'Rider Points',
        columns: [
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
    ],
    []
  );

  return (
    <TableWithData
      colDef={ownerCols}
      query={points}
      paginate={true}
    />
  );
}

export default PointsTable;
