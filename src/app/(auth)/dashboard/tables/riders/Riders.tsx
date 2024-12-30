'use client';
import TableWithData from '@/components/tables/BaseTable';
import { RiderCombo } from '@prisma/client';

import type { ColumnDef } from '@tanstack/react-table';

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
        accessorKey: 'showYear',
        id: 'showYear',
        cell: info => info.getValue(),
        header: () => <span> Show year </span>,
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

function DashboardRiders({ riders }: { riders: Array<RiderCombo> }) {
  return (
    <TableWithData
      extraTableOpts={{
        columns,
      }}
      data={riders}
      paginate
      search
    />
  );
}

export default DashboardRiders;
