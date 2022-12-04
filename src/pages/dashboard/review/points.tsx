import { trpc } from '@/utils/trpc';
import { ColumnDef } from '@tanstack/react-table';

import { DashboardLayout } from '@/components/layout';
import { TableWithData } from '@/components/tables';
import { ConfirmPoints } from '@/components/dashboard';

import type { Show } from '@prisma/client';
import type { ReactElement } from 'react';

const pointCols: ColumnDef<Show>[] = [
  {
    header: 'Show entries to review',
    columns: [
      {
        accessorKey: 'showName',
        id: 'showName',
        cell: info => info.getValue(),
        header: 'Show',
      },
      {
        accessorKey: 'uid',
        id: 'uid',
        cell: info => <ConfirmPoints uid={info.getValue()} />,
        header: '',
      },
    ],
  },
];

function Points() {
  const memberPoints = trpc.useQuery(['shows.get-shows']);

  return (
    <div className='grid w-full place-items-center'>
      {memberPoints.data && memberPoints.data.length < 0 ? (
        <div className='rounded-lg p-5 shadow-xl'>
          No new shows to review...
        </div>
      ) : (
        <TableWithData
          colDef={pointCols}
          query={memberPoints}
        />
      )}
    </div>
  );
}

Points.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Points;
