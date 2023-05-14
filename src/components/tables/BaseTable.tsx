import {
  TableOptions,
  ColumnDef,
  getCoreRowModel,
} from '@tanstack/react-table';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';
import Table from '../styled-ui/Table';

interface TableWithDataProps<TData, TError> {
  colDef: ColumnDef<TData>[];
  query: UseTRPCQueryResult<TData[] | TData, TError>;
  paginate?: boolean;
  search?: boolean;
}

function TableWithData<TData, TError>({
  colDef,
  query,
  paginate,
  search,
}: TableWithDataProps<TData, TError>) {
  if (query.isLoading) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Loading...</div>;
  }

  if (query.isError) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Error...</div>;
  }

  const tableOpts: TableOptions<TData> = {
    data: query.data as TData[],
    columns: colDef,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      paginate={paginate}
      search={search}
      tableOptions={tableOpts}
    />
  );
}

export default TableWithData;
