import { useMemo } from 'react';
import { RouterOutputs, trpc } from '@/utils/trpc';

import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = RouterOutputs['riders']['all'];
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
  const riders = trpc.riders.all.useQuery({
    selectFields: {
      horse: true,
      member: true,
      totalPoints: true,
      totalShows: true,
      division: true,
    },
  });

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
      colDef={overrideDefaultCols ?? defaultCols}
      query={riders}
      paginate={true}
      search={search}
    />
  );
}

export default PlacingsTable;
