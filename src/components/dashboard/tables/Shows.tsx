import EndOfYearPoints from '@/components/dashboard/EndOfYearPoints';
import AddNewShow from '@/components/forms/dashboard/AddNewShow';
import DownloadPoints from '@/components/forms/dashboard/DownloadPoints';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';
import { RouterOutputs, trpc } from '@/utils/trpc';
import type { ColumnDef } from '@tanstack/react-table';

type Show = RouterOutputs['shows']['all'][number];
const columns: Array<ColumnDef<Show>> = [
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
      {
        accessorKey: 'uid',
        id: 'uid',
        cell: info => <DownloadPoints uid={info.getValue()} />,
        header: () => <></>,
      },
    ],
  },
];

function ShowsTable() {
  const shows = trpc.shows.all.useQuery({
    orderBy: {
      showDate: 'asc',
    },
    include: {
      riders: true,
      points: true,
    },
  });

  return (
    <div>
      <AddNewShow />
      <EndOfYearPoints />
      <TableWithData
        extraTableOpts={{
          columns,
        }}
        query={shows}
        paginate
        search
      />
    </div>
  );
}

export default ShowsTable;
