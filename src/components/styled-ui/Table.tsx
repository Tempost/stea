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
import { Button } from './Button';
import Select from './Select';

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
      <tr className='hover:bg-base-200'>
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
    <div className='overflow-x-auto'>
      <div className='inline-block min-w-full py-2 md:px-6 lg:px-8'>
        <div className='overflow-hidden'>
          <table className='table'>
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
                            className='ml-auto w-36'
                            size='sm'
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
                  <td>
                    <span className='loading loading-dots'></span>
                  </td>
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
                <Button
                  size='xs'
                  variant='secondary'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  previous
                </Button>
                <Button
                  size='xs'
                  variant='primary'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  next
                </Button>
              </div>

              <div className='flex flex-col items-center'>
                <Select
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
                </Select>
                <span className='text-2xs flex items-center gap-1 lg:text-sm'>
                  <div>page</div>
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
