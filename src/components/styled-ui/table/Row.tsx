import { flexRender, type Row } from '@tanstack/react-table';

function Row<TData>({ row }: { row: Row<TData> }) {
  return (
    <tr className='hover:bg-base-200'>
      {row.getVisibleCells().map(cell => {
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

export default Row;
