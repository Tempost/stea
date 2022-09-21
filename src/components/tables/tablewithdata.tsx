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
    return <div className='shadow-xl rounded-b-lg p-5'>Loading...</div>;
  }

  if (query.isError) {
    return <div className='shadow-xl rounded-b-lg p-5'>Error...</div>;
  }

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto -mx-2 md:-mx-6 lg:-mx-8'>
        <div className='py-2 inline-block min-w-full md:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full'>
              <thead className='bg-white border-b'>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className='text-sm font-medium text-gray-900 px-3 py-2 md:px-6 md:py-4 text-center'
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

              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className='bg-white border-b transition duration-300 ease-in-out hover:bg-teal-200/50'
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          key={cell.id}
                          className={'text-sm text-gray-900 font-normal px-3 py-2 md:px-6 md:py-4 whitespace-nowrap'}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
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
        </div>
      </div>
    </div>
  );
}

export default TableWithData;
