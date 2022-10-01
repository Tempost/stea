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
            accessorKey: 'horse.horseRN',
            id: 'horse.horseRN',
            cell: info => info.getValue(),
            header: () => <span> Horse </span>,
          },
          {
            accessorKey: 'member.fullName',
            id: 'member.fullName',
            cell: info => info.getValue(),
            header: () => <span> Rider </span>,
          },
          {
            accessorKey: 'totalPoints',
            id: 'totalPoints',
            cell: info => info.getValue(),
            header: () => <span> Points </span>,
          },
          {
            accessorKey: 'totalShows',
            id: 'totalShows',
            cell: info => info.getValue(),
            header: () => <span> Shows Attended </span>,
          },
          {
            accessorKey: 'division',
            id: 'division',
            cell: info => info.getValue(),
            header: () => <span> Divison </span>,
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
