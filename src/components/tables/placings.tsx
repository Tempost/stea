import { useMemo } from 'react';
import { inferQueryOutput, trpc } from '@/utils/trpc';

import TableWithData from './tablewithdata';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = inferQueryOutput<'rider.get-riders'>[number];
interface PlacingsTableProps {
  title?: string;
  overrideDefaultCols?: ColumnDef<RiderCombo>[];
}

function PlacingsTable({ title, overrideDefaultCols }: PlacingsTableProps) {
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
      colDef={overrideDefaultCols ?? defaultCols}
      query={riders}
      paginate={true}
    />
  );
}

export default PlacingsTable;
