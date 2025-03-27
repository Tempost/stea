'use client';
import Checkbox from '@/components/styled-ui/Checkbox';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';
import type { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { useMemo, useState, useTransition } from 'react';
import { Show } from '@prisma/client';
import AddNewShow from './AddNewShow';
import DownloadPoints from './DownloadPoints';
import RemoveSelectedShows from './RemoveSelectedShows';
import Select from '@/components/styled-ui/Select';
import { getShowsByYear } from './action';

const currYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => i + 2022);

function ShowsTable({ data }: { data: Array<Show> }) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [year, setYear] = useState(currYear);
  const [shows, setShows] = useState(data);
  const [pending, startTransition] = useTransition();

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
              if (selectionLen === 0) return null;

              return <span>{selectionLen}</span>;
            },
            cell: ({ row }) => (
              <Checkbox
                id={row.id}
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                size='sm'
              />
            ),
          },
          {
            accessorKey: 'showDate',
            id: 'showDate',
            cell: info => {
              const date: Date | null = info.getValue();

              return date ? readableDateTime(date) : '';
            },
            header: () => <span> Show Date </span>,
          },
          {
            accessorKey: 'showEndDate',
            id: 'showEndDate',
            cell: info => {
              const date: Date | null = info.getValue();

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
    [],
  );

  return (
    <div>
      <TableWithData
        loading={pending}
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
          <div className='space-x-1'>
            <Select
              name='show-year'
              id='show-year'
              value={year}
              size='sm'
              className='w-fit'
              onChange={e => {
                e.preventDefault();
                setYear(Number.parseInt(e.target.value));
                startTransition(async () => {
                  const newShows = await getShowsByYear(e.target.value);
                  setShows(newShows);
                });
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
            </Select>
            <AddNewShow />
            <DownloadPoints
              year={year}
              showSelection={rowSelection}
            />
            <RemoveSelectedShows
              showSelection={rowSelection}
              clearSelection={() => setRowSelection({})}
            />
          </div>
        }
        data={shows}
        paginate
        search
      />
    </div>
  );
}

export default ShowsTable;
