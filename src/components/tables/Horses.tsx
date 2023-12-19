import { RouterOutputs, trpc } from '@/utils/trpc';
import TableWithData from './BaseTable';

import type { ColumnDef } from '@tanstack/react-table';

type Horse = RouterOutputs['horses']['all'][number];

interface HorseTableProps {
  overRideDefaultCols?: Array<ColumnDef<Horse>>;
  search?: boolean;
  paginate?: boolean;
}

const defaultCols: Array<ColumnDef<Horse>> = [
  {
    header: 'Horses',
    columns: [
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

function getRegistrationEnd() {
  const currDate = new Date();
  const registrationEnd = new Date(currDate.getFullYear(), 10, 30);

  // If the current month is decemeber
  if (currDate.getMonth() == 11) {
    registrationEnd.setFullYear(registrationEnd.getFullYear() + 1);
  }

  return registrationEnd;
}

function HorseTable({ overRideDefaultCols, ...props }: HorseTableProps) {
  const horses = trpc.horses.all.useQuery({
    where: {
      OR: [{ regType: 'Life' }, { registrationEnd: getRegistrationEnd() }],
    },
    select: {
      horseRN: true,
      regType: true,
      owner: true,
    },
    orderBy: {
      regType: 'asc',
    },
  });

  return (
    <TableWithData
      extraTableOpts={{
        columns: overRideDefaultCols ?? defaultCols,
      }}
      query={horses}
      {...props}
    />
  );
}

export default HorseTable;
