import {
  createColumnHelper,
  getCoreRowModel,
  TableOptions,
} from '@tanstack/react-table';
import { EntryReviewType } from '@/types/common';
import Table from '@/components/styled-ui/Table';

interface EntryReviewProps {
  entries: EntryReviewType[];
}

const columnHelper = createColumnHelper<EntryReviewType>();

const columnDef = [
  columnHelper.group({
    header: 'Review before final submission',
    columns: [
      columnHelper.accessor('fullName', {
        id: 'fullName',
        cell: info => info.getValue(),
        header: () => <span> Rider </span>,
      }),
      columnHelper.accessor('horseRN', {
        id: 'horseRN',
        cell: info => info.getValue(),
        header: () => <span> Horse </span>,
      }),
      columnHelper.accessor('division', {
        id: 'division',
        cell: info => info.getValue(),
        header: () => <span> Division </span>,
      }),
      columnHelper.accessor('rideType', {
        id: 'rideType',
        cell: info => info.getValue(),
        header: () => <span> Ride Type </span>,
      }),
      columnHelper.accessor('place', {
        id: 'place',
        cell: info => info.getValue(),
        header: () => <span> Place </span>,
      }),
      columnHelper.accessor('points', {
        id: 'points',
        cell: info => info.getValue(),
        header: () => <span> Points </span>,
      }),
    ],
  }),
];

function EntryReview({ entries }: EntryReviewProps) {
  const tableOpts: TableOptions<EntryReviewType> = {
    data: entries,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      paginate
      tableOptions={tableOpts}
    />
  );
}

export default EntryReview;
