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
import DebouncedInput from '../styled-ui/DebouncedInput';
import { Button } from './Button';
import Select from './Select';
import Loading from './Loading';
import { ChevLeft, ChevRight } from '../icons';

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
                'text-base-content px-2 py-2 text-xs font-normal whitespace-nowrap md:px-2 md:py-2 lg:text-sm'
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
      <table className='table'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='text-base-content px-2 py-2 text-center text-xs font-medium lg:text-sm'
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
                        className='ml-auto w-36 self-center'
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
                <Loading />
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

      {table.getPageCount() > 1 ? (
        <div className='flex w-full justify-between p-2'>
          <div className='join'>
            <Button
              size='xs'
              variant='secondary'
              join={true}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {ChevLeft}
            </Button>
            <Button
              size='xs'
              join={true}
              className='cursor-default'
            >
              Page {table.getState().pagination.pageIndex + 1}/
              {table.getPageCount()}
            </Button>
            <Button
              size='xs'
              variant='primary'
              join={true}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {ChevRight}
            </Button>
          </div>

          <Select
            size='xs'
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
            className='w-fit'
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
        </div>
      ) : null}
    </div>
  );
}

export default Table;
