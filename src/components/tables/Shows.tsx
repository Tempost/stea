import { useMemo } from 'react';

import { trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';
import { readableDateTime } from '@/utils/helpers';
import AddNewShow from './AddNewShow';
import type { Show } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

interface ShowTableProps {
  overRideDefaultCols?: ColumnDef<Show>[];
  search?: boolean;
}

function ShowsTable({ overRideDefaultCols, search }: ShowTableProps) {
  const shows = trpc.useQuery([
    'shows.get-shows',
    {
      includes: {
        riders: true,
        points: true,
      },
    },
  ]);

  const defaultCols = useMemo<ColumnDef<Show>[]>(
    () => [
      {
        header: 'Shows',
        columns: [
          {
            accessorKey: 'showDate',
            id: 'showDate',
            cell: info => {
              const date: Date | undefined = info.getValue();

              return date ? readableDateTime(date) : '';
            },
            header: () => <span> Show Date </span>,
          },
          {
            accessorKey: 'showEndDate',
            id: 'showEndDate',
            cell: info => {
              const date: Date | undefined = info.getValue();

              return date ? readableDateTime(date) : '';
            },
            header: () => <span> End Date </span>,
          },
          {
            accessorKey: 'showName',
            id: 'showName',
            cell: info => info.getValue(),
            header: () => <span> Show Name </span>,
          },
          {
            accessorKey: 'showType',
            id: 'showType',
            cell: info => info.getValue(),
            header: () => <span> Type </span>,
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <AddNewShow />
      <TableWithData
        colDef={overRideDefaultCols ?? defaultCols}
        query={shows}
        paginate={true}
        search={search}
      />
    </>
  );
}

export default ShowsTable;
