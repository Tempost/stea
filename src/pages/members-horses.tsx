import { ReactElement, useMemo } from 'react';

import { PublicLayout } from '@/components/layout';
import { HorseTable, MemberTable } from '@/components/tables';

import type { ColumnDef } from '@tanstack/react-table';
import type { Horse, Member } from '@prisma/client';

function MembersAnHorses() {
  const memberCols = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        header: 'Members',
        columns: [
          {
            accessorKey: 'fullName',
            id: 'fullName',
            cell: info => info.getValue(),
            header: () => <span> Name </span>,
          },
          {
            accessorKey: 'memberStatusType',
            id: 'memberStatusType',
            cell: info => {
              const statusType = info.getValue();
              if (statusType === 'AdultAmateur') {
                return 'Adult Amateur';
              }

              return statusType;
            },
            header: () => <span> Member Type </span>,
          },
          {
            accessorKey: 'memberStatus',
            id: 'memberStatus',
            cell: info => info.getValue(),
            header: () => <span> Status </span>,
          },
        ],
      },
    ],
    []
  );

  const horseCols = useMemo<ColumnDef<Horse>[]>(
    () => [
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
    ],
    []
  );

  // TODO: Fade Image into background
  // <Image layout='fill' src='/membersandhorses.jpg'/>
  return (
    <div className='md:grid md:grid-flow-col md:place-content-evenly'>
      <MemberTable
        overRideDefaultCols={memberCols}
        search={true}
      />
      <HorseTable
        overRideDefaultCols={horseCols}
        search={true}
      />
    </div>
  );
}

MembersAnHorses.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default MembersAnHorses;
