'use client';
import { TableOptions } from '@tanstack/react-table';
import Table, { TableProps } from '../styled-ui/Table';

interface TableWithDataProps<TData>
  extends Omit<TableProps<TData>, 'tableOptions'> {
  data: Array<TData>;
  extraTableOpts: Pick<Partial<TableOptions<TData>>, 'data'> &
    Omit<TableOptions<TData>, 'getCoreRowModel' | 'data'>;
}

function TableWithData<TData>({
  data,
  extraTableOpts,
  ...props
}: TableWithDataProps<TData>) {
  return (
    <Table
      {...props}
      tableOptions={{
        ...extraTableOpts,
        data: data,
      }}
    />
  );
}

export default TableWithData;
