import { RouterOutputs, trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';
import { readableDateTime } from '@/utils/helpers';
import type { ColumnDef } from '@tanstack/react-table';
import AddNewShow from '@/components/forms/dashboard/AddNewShow';

type Show = RouterOutputs['shows']['all'];

interface ShowTableProps {
  overRideDefaultCols?: ColumnDef<Show>[];
  search?: boolean;
}

function ShowsTable({ overRideDefaultCols, search }: ShowTableProps) {
  const shows = trpc.shows.all.useQuery({
    orderBy: {
      showDate: 'asc',
    },
    include: {
      riders: true,
      points: true,
    },
  });

  const defaultCols: ColumnDef<Show>[] = [
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
  ];

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
