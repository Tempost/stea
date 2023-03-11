import TableWithData from '@/components/tables/BaseTable';
import { RouterOutputs, trpc } from '@/utils/trpc';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = RouterOutputs['riders']['all'][number];

function DashboardRiders() {
  const riders = trpc.riders.all.useQuery();

  const riderComboCols: ColumnDef<RiderCombo>[] = [
    {
      header: 'Riders',
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
  ];

  return (
    <TableWithData
      colDef={riderComboCols}
      query={riders}
      paginate
      search
    />
  );
}

export default DashboardRiders;
