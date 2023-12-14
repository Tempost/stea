import TableWithData from '@/components/tables/BaseTable';
import { RouterOutputs, trpc } from '@/utils/trpc';

import type { ColumnDef } from '@tanstack/react-table';

type RiderCombo = RouterOutputs['riders']['all'][number];
const columns: Array<ColumnDef<RiderCombo>> = [
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

function DashboardRiders() {
  const riders = trpc.riders.all.useQuery();

  return (
    <TableWithData
      extraTableOpts={{
        columns,
      }}
      query={riders}
      paginate
      search
    />
  );
}

export default DashboardRiders;
