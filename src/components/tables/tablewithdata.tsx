import { rankItem } from '@tanstack/match-sorter-utils';
import {
  TableOptions,
  ColumnDef,
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
  getFacetedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { UseQueryResult } from 'react-query';
import DebouncedInput from '../data-entry/debouncedInput';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

interface TableWithDataProps<T> {
  colDef: ColumnDef<T>[];
  query: UseQueryResult<T[] | T>;
  paginate?: boolean;
  search?: boolean;
}

function TableWithData<T>({
  colDef,
  query,
  paginate,
  search,
}: TableWithDataProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');

  const tableOpts: TableOptions<T> = {
    data: query.data as T[],
    columns: colDef,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    globalFilterFn: fuzzyFilter,
    state: {
      globalFilter: globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  };

  const table = useReactTable(tableOpts);

  if (query.isLoading) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Loading...</div>;
  }

  if (query.isError) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Error...</div>;
  }

  return (
    <div className='-mx-2 overflow-x-auto md:-mx-6 lg:-mx-8'>
      <div className='inline-block min-w-full py-2 md:px-6 lg:px-8'>
        <div className='overflow-hidden'>
          <table className='min-w-full'>
            <thead className='border-b bg-white'>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='select-none px-3 py-2 text-center text-xs font-medium text-gray-900 lg:text-sm'
                    >
                      <div className='flex flex-row justify-between'>
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {headerGroup.depth === 0 && search && (
                          <DebouncedInput
                            className='input input-primary input-sm w-36'
                            type='text'
                            placeholder='search'
                            value={globalFilter ?? ''}
                            onChange={value => setGlobalFilter(String(value))}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className='border-b bg-white transition duration-300 ease-in-out hover:bg-primary/10'
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td
                        key={cell.id}
                        className={
                          'whitespace-nowrap px-3 py-2 text-xs font-normal text-gray-900 md:px-4 md:py-3 lg:text-sm'
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className='m-2'>
            <div className='flex w-full items-center justify-between gap-2'>
              <div className='flex gap-2'>
                <button
                  className='btn btn-secondary btn-xs'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  previous
                </button>

                <button
                  className='btn btn-primary btn-xs'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </button>
              </div>

              <div className='flex flex-col items-center'>
                <select
                  className='select select-secondary select-xs lg:select-sm'
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option
                      key={pageSize}
                      value={pageSize}
                    >
                      Show {pageSize}
                    </option>
                  ))}
                </select>
                <span className='text-2xs flex items-center gap-1 lg:text-sm'>
                  <div>Page</div>
                  <strong>
                    {`${table.getState().pagination.pageIndex + 1} of
                        ${table.getPageCount()}`}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableWithData;
