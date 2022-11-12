import { useMemo } from 'react';

import { trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';
import type { Show } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { readableDateTime } from '@/utils/helpers';
import AddNewShow from './AddNewShow';

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
              const date: Date = info.getValue();
              if (date === null) return 'N/A';

              return readableDateTime(date);
            },
            header: () => <span> Show Date </span>,
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
          {
            accessorKey: 'riders',
            id: 'riders',
            cell: info => info.getValue().length,
            header: () => <span> Attendee count </span>,
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
