import { ReactElement, useMemo } from 'react';

import { PublicLayout } from '@/components/layout';

import type { ColumnDef } from '@tanstack/react-table';
import type { CompleteRiderCombo } from '@/backend/prisma/zod';
import RidersTable from '@/components/tables/ridercombos';

function SteaPoints() {
  const riderCols = useMemo<ColumnDef<CompleteRiderCombo>[]>(
    () => [
      {
        header: 'Riders',
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
    <div className='pt-28 w-full grid place-items-center'>
      <RidersTable overRideDefaultCols={riderCols} />
    </div>
  );
}

SteaPoints.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaPoints;
