import { useMemo } from 'react';
import { inferQueryOutput, trpc } from '@/utils/trpc';

import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = inferQueryOutput<'rider.get-riders'>[number];
interface PlacingsTableProps {
  title?: string;
  overrideDefaultCols?: ColumnDef<RiderCombo>[];
  search?: boolean;
}

function PlacingsTable({
  title,
  overrideDefaultCols,
  search,
}: PlacingsTableProps) {
  const riders = trpc.useQuery(
    [
      'rider.get-riders',
      {
        selectFields: {
          horse: true,
          member: true,
          totalPoints: true,
          totalShows: true,
        },
      },
    ],
    { refetchOnWindowFocus: false }
  );

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
        ],
      },
    ],
    [title]
  );

  return (
    <TableWithData
      colDef={overrideDefaultCols ?? defaultCols}
      query={riders}
      paginate={true}
      search={search}
    />
  );
}

export default PlacingsTable;
