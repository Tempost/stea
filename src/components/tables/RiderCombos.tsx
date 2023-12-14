import { useMemo } from 'react';

import { RouterOutputs, trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = RouterOutputs['riders']['all'][number];

interface RidersTableProps {
  title?: string;
  overRideDefaultCols?: Array<ColumnDef<RiderCombo>>;
  search?: boolean;
  paginate?: boolean;
}

function RidersTable({
  title,
  overRideDefaultCols,
  ...props
}: RidersTableProps) {
  const riders = trpc.riders.all.useQuery();

  const defaultCols: Array<ColumnDef<RiderCombo>> = useMemo(
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
      extraTableOpts={{ columns: overRideDefaultCols ?? defaultCols }}
      query={riders}
      {...props}
    />
  );
}

export default RidersTable;
