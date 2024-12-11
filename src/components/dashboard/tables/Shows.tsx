import Checkbox from '@/components/data-entry/Checkbox';
import AddNewShow from '@/components/forms/dashboard/AddNewShow';
import DownloadPoints from '@/components/forms/dashboard/DownloadPoints';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';
import { RouterOutputs, trpc } from '@/utils/trpc';
import type { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import RemoveSelectedShows from '@/components/dashboard/RemoveSelectedShows';

const currYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => i + 2022);

type Show = RouterOutputs['shows']['all'][number];

function ShowsTable() {
  const [yearSelect, setYearSelect] = useState(currYear);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const shows = trpc.shows.all.useQuery({
    where: {
      showDate: {
        lte: new Date(yearSelect, 11, 31),
        gte: new Date(yearSelect, 0, 1),
      },
    },
    orderBy: {
      showDate: 'asc',
    },
    include: {
      riders: true,
      points: true,
    },
  });

  const columns = useMemo<Array<ColumnDef<Show>>>(
    () => [
      {
        id: 'header',
        columns: [
          {
            id: 'select',
            header: ({ table }) => {
              const selectionLen =
                table.getFilteredSelectedRowModel().rows.length;
              if (selectionLen === 0) return <></>;

              return <span>{selectionLen}</span>;
            },
            cell: ({ row }) => (
              <Checkbox
                id={row.id}
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
              />
            ),
          },
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
    <div>
      <TableWithData
        extraTableOpts={{
          columns,
          enableRowSelection: true,
          onRowSelectionChange: setRowSelection,
          getRowId: row => row.uid,
          state: {
            rowSelection,
          },
        }}
        extras={
          <div className='flex space-x-1'>
            <select
              name='show-year'
              id='show-year'
              className='select select-bordered select-primary select-sm w-fit'
              value={yearSelect}
              onChange={e => {
                e.preventDefault();
                setYearSelect(Number.parseInt(e.target.value));
              }}
            >
              {years.map(year => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
            <AddNewShow />
            <DownloadPoints
              year={yearSelect}
              showSelection={rowSelection}
            />
            <RemoveSelectedShows
              showSelection={rowSelection}
              clearSelection={() => setRowSelection({})}
            />
          </div>
        }
        query={shows}
        paginate
        search
      />
    </div>
  );
}

export default ShowsTable;
