import {
  TableOptions,
  ColumnDef,
  getCoreRowModel,
} from '@tanstack/react-table';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';
import Table, { TableProps } from '../styled-ui/Table';

interface TableWithDataProps<TData, TError>
  extends Omit<TableProps<TData>, 'tableOptions'> {
  colDef: Array<ColumnDef<TData>>;
  query: UseTRPCQueryResult<Array<TData> | TData, TError>;
  paginate?: boolean;
  search?: boolean;
}

function TableWithData<TData, TError>({
  colDef,
  query,
  ...props
}: TableWithDataProps<TData, TError>) {
  if (query.isLoading) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Loading...</div>;
  }

  if (query.isError) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Error...</div>;
  }

  const tableOpts: TableOptions<TData> = {
    data: query.data as Array<TData>,
    columns: colDef,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      {...props}
      tableOptions={tableOpts}
    />
  );
}

export default TableWithData;
