import {
  TableOptions,
  ColumnDef,
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { UseQueryResult } from 'react-query';

interface TableWithDataProps<T> {
  colDef: ColumnDef<T>[];
  query: UseQueryResult<T[] | T>;
  paginate?: boolean;
}

function TableWithData<T>({ colDef, query, paginate }: TableWithDataProps<T>) {
  const tableOpts: TableOptions<T> = {
    data: query.data as T[],
    columns: colDef,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
  };

  const table = useReactTable(tableOpts);

  if (query.isLoading) {
    return <>Loading...</>;
  }

  if (query.isError) {
    return <>Error...</>;
  }

  return (
    <div className='shadow-xl rounded-b-lg p-5'>
      <table className='table table-compact'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='text-center'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='border'>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className='divide-x'
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='m-2'>
        <div className='flex justify-between items-center gap-2 w-full'>
          <div className='flex gap-2'>
            <button
              className='btn btn-secondary btn-xs'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              previous
            </button>

            <button
              className='btn btn-secondary btn-xs'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>

          <div className='flex flex-col items-center'>
            <select
              className='select select-xs select-secondary'
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
            <span className='flex items-center gap-1 text-sm'>
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableWithData;
