import { ReactElement } from 'react';
import { Member, Horse } from '@prisma/client';
import { trpc } from '@/utils/trpc';
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';

import { PublicLayout } from '@/components/layout';
import TableWithData from '@/components/tablewithdata';

const memberCols: ColumnDef<Member>[] = [
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
        accessorKey: 'JRSR',
        id: 'JRSR',
        cell: info => info.getValue(),
        header: () => <span> Rider Level </span>,
      },
    ],
  },
];

const horseCols: ColumnDef<Horse>[] = [
  {
    header: '2022 Year End Placings.',
    columns: [],
  },
];

function MembersAnHorses() {
  const members = trpc.useQuery(['member.get-members']);

  return (
    <div className='pt-28 w-full grid place-items-center'>
      <TableWithData
        colDef={memberCols}
        query={members}
      />
    </div>
  );
}
MembersAnHorses.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default MembersAnHorses;
