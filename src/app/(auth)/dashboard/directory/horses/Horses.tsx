'use client';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';

import { HorseDirectory } from '@/server/prisma/queries/args';
import type { ColumnDef } from '@tanstack/react-table';
import NewHorseForm from './NewHorseForm';

const columns: Array<ColumnDef<HorseDirectory>> = [
  {
    id: 'horses',
    columns: [
      {
        accessorKey: 'registrationDate',
        id: 'registrationDate',
        cell: info => readableDateTime(info.getValue()),
        header: () => <span> Join Date </span>,
      },
      {
        accessorKey: 'registrationEnd',
        id: 'registrationEnd',
        cell: info =>
          info.getValue() ? readableDateTime(info.getValue()) : '',
        header: () => <span> Registation Ends </span>,
      },
      {
        accessorKey: 'horseRN',
        id: 'horseRN',
        cell: info => info.getValue(),
        header: () => <span> Registered Name </span>,
      },
      {
        accessorKey: 'regType',
        id: 'regType',
        cell: info => info.getValue(),
        header: () => <span> Status </span>,
      },
      {
        accessorFn: horse => {
          return horse.memberName ?? horse.owner;
        },
        id: 'owner',
        cell: info => info.getValue(),
        header: () => <span> Owner </span>,
      },
    ],
  },
];

function DashboardHorses({ horses }: { horses: Array<HorseDirectory> }) {
  return (
    <TableWithData
      extraTableOpts={{
        columns,
      }}
      data={horses}
      extras={<NewHorseForm />}
      paginate
      search
    />
  );
}

export default DashboardHorses;
