import { trpc } from '@/utils/trpc';
import { ColumnDef } from '@tanstack/react-table';

import { DashboardLayout } from '@/components/layout';
import { TableWithData } from '@/components/tables';
import ConfirmPoints from '@/components/confirmpoints';

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
  const memberPoints = trpc.useQuery(['shows.get', { reviewed: false }]);

  return (
    <div className='pt-28 w-full grid place-items-center'>
      {memberPoints.data !== undefined && memberPoints.data.length < 0 ? (
        <div className='shadow-xl rounded-lg p-5'>
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
