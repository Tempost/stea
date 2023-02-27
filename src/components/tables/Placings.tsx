import { RouterOutputs, trpc } from '@/utils/trpc';

import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = RouterOutputs['riders']['all'][number];
interface PlacingsTableProps {
  title?: string;
  search?: boolean;
}

function PlacingsTable({ title, search }: PlacingsTableProps) {
  const riders = trpc.riders.all.useQuery();

  const defaultCols: ColumnDef<RiderCombo>[] = [
    {
      header: title ?? 'Riders',
      columns: [
        {
          accessorKey: 'division',
          id: 'division',
          cell: info => info.getValue(),
          header: () => <span> Division </span>,
        },
        {
          accessorKey: 'member.memberStatusType',
          id: 'memberStatusType',
          cell: info => {
            const statusType = info.getValue();
            if (statusType === 'AdultAmateur') {
              return 'Adult Amateur';
            }

            return statusType;
          },
          header: () => <span> Member Type </span>,
        },
        {
          accessorKey: 'member.fullName',
          id: 'member.fullName',
          cell: info => info.getValue(),
          header: () => <span> Rider </span>,
        },
        {
          accessorKey: 'horse.horseRN',
          id: 'horse.horseRN',
          cell: info => info.getValue(),
          header: () => <span> Horse </span>,
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
  ];

  return (
    <TableWithData
      colDef={defaultCols}
      query={riders}
      search={search}
      paginate
    />
  );
}

export default PlacingsTable;
