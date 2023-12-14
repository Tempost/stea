import { getCoreRowModel, TableOptions } from '@tanstack/react-table';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';
import Table, { TableProps } from '../styled-ui/Table';

interface TableWithDataProps<TData, TError>
  extends Omit<TableProps<TData>, 'tableOptions'> {
  query: UseTRPCQueryResult<Array<TData> | TData, TError>;
  extraTableOpts: Pick<Partial<TableOptions<TData>>, 'data'> &
    Omit<TableOptions<TData>, 'getCoreRowModel' | 'data'>;
}

function TableWithData<TData, TError>({
  query,
  extraTableOpts,
  ...props
}: TableWithDataProps<TData, TError>) {
  if (query.isLoading) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Loading...</div>;
  }

  if (query.isError) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Error...</div>;
  }

  return (
    <Table
      {...props}
      tableOptions={{
        ...extraTableOpts,
        data: query.data as Array<TData>,
        getCoreRowModel: getCoreRowModel(),
      }}
    />
  );
}

export default TableWithData;
