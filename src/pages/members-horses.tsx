import Image from 'next/image';
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
            accessorKey: 'membershipDate',
            id: 'membershipDate',
            cell: info => {
              const date: Date = info.getValue();

              return `${date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`;
            },
            header: () => <span> Join Date </span>,
          },
          {
            accessorKey: 'fullName',
            id: 'fullName',
            cell: info => info.getValue(),
            header: () => <span> Name </span>,
          },
          {
            accessorKey: 'JRSR',
            id: 'JRSR',
            cell: info => info.getValue(),
            header: () => <span> Rider Level </span>,
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
            accessorKey: 'registrationDate',
            id: 'registrationDate',
            cell: info => {
              const date: Date = info.getValue();
              if (date === null) return 'N/A';

              return `${date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`;
            },
            header: () => <span> Registration Date </span>,
          },
          {
            accessorKey: 'horseRN',
            id: 'horseRN',
            cell: info => info.getValue(),
            header: () => <span> Registered Name </span>,
          },
          {
            accessorKey: 'horseAKA',
            id: 'horseAKA',
            cell: info => info.getValue(),
            header: () => <span> Barn Name </span>,
          },
          {
            accessorKey: 'memberName',
            id: 'memberName',
            cell: info => info.getValue(),
            header: () => <span> Member </span>,
          },
          {
            accessorKey: 'owner',
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
    <div className='pt-28 w-full grid place-items-center'>
      <MemberTable overRideDefaultCols={memberCols} />
      <HorseTable overRideDefaultCols={horseCols} />
    </div>
  );
}

MembersAnHorses.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default MembersAnHorses;
