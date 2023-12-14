import NewHorseForm from '@/components/forms/dashboard/NewHorseForm';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';
import { RouterOutputs, trpc } from '@/utils/trpc';

import type { ColumnDef } from '@tanstack/react-table';

type Horse = RouterOutputs['horses']['all'][number];

const columns: Array<ColumnDef<Horse>> = [
  {
    header: 'Horses',
    columns: [
      {
        accessorKey: 'registrationDate',
        id: 'registrationDate',
        cell: info => readableDateTime(info.getValue()),
        header: () => <span> Registered Date </span>,
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
        accessorFn: horseRec => {
          return horseRec.memberName ?? horseRec.owner;
        },
        id: 'owner',
        cell: info => info.getValue(),
        header: () => <span> Owner </span>,
      },
    ],
  },
];

function DashboardHorses() {
  const horses = trpc.horses.all.useQuery();

  return (
    <div>
      <NewHorseForm />
      <TableWithData
        extraTableOpts={{
          columns,
        }}
        query={horses}
        paginate
        search
      />
    </div>
  );
}

export default DashboardHorses;
