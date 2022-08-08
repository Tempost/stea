import {
  ColumnDef,
  PaginationState,
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

function TableWithData<T>({ colDef, query }: TableWithDataProps<T>) {
  const table = useReactTable({
    data: query.data as T[],
    columns: colDef,
    getCoreRowModel: getCoreRowModel(),
  });

  if (query.isLoading) {
    return <>Loading...</>;
  }

  if (query.isError) {
    return <>Error...</>;
  }

  return (
    <table className='table table-compact shadow-xl'>
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
  );
}

export default TableWithData;
