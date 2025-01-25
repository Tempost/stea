'use client';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, ReactNode, useState } from 'react';
import DebouncedInput from '../data-entry/DebouncedInput';

interface RowRenderProps<TData> {
  row: Row<TData>;
}

export interface TableProps<TData> {
  paginate?: boolean;
  search?: boolean;
  tableOptions: Omit<TableOptions<TData>, 'getCoreRowModel'>;
  extras?: ReactElement;
  rowRender?: (props: RowRenderProps<TData>) => ReactNode;
  loading?: boolean;
}

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

function Table<TData>({
  paginate,
  search,
  tableOptions: { state, ...opts },
  extras,
  loading,
  ...props
}: TableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState('');

  const defaultOptions: TableOptions<TData> = {
    ...opts,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    state: {
      ...state,
      globalFilter: globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  };

  function RowRender(rowProps: RowRenderProps<TData>) {
    if (props.rowRender) {
      return <>{props.rowRender(rowProps)}</>;
    }

    return (
      <tr className='border-b bg-white transition duration-300 ease-in-out hover:bg-primary/10'>
        {rowProps.row.getVisibleCells().map(cell => {
          return (
            <td
              key={cell.id}
              className={
                'whitespace-nowrap px-2 py-2 text-xs font-normal text-gray-900 md:px-2 md:py-2 lg:text-sm'
              }
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    );
  }

  const table = useReactTable(defaultOptions);

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
                      className='select-none px-2 py-2 text-center text-xs font-medium text-gray-900 lg:text-sm'
                    >
                      <div className='flex flex-row'>
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        {extras && headerGroup.depth === 0 && extras}
                        {headerGroup.depth === 0 && search && (
                          <DebouncedInput
                            className='input input-primary input-sm ml-auto w-36'
                            type='text'
                            placeholder='Search'
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

            {loading ? (
              <tbody>
                <tr>
                  <td>Loading...</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <RowRender
                    key={row.id}
                    row={row}
                  />
                ))}
              </tbody>
            )}
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

export default Table;
