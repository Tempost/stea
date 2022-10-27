import { trpc } from '@/utils/trpc';
import { ColumnDef } from '@tanstack/react-table';

import { DashboardLayout } from '@/components/layout';
import { TableWithData } from '@/components/tables';
import ConfirmMember from '@/components/dashboard/confirmmember';

import type { Member } from '@prisma/client';
import type { ReactElement } from 'react';

const applicantCols: ColumnDef<Member>[] = [
  {
    header: 'Unconfirmed Members',
    columns: [
      {
        accessorKey: 'fullName',
        id: 'fullName',
        cell: info => info.getValue(),
        header: 'Name',
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
        header: 'Member Type',
      },
      {
        accessorKey: 'email',
        id: 'email',
        cell: info => info.getValue(),
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        id: 'phone',
        cell: info => info.getValue(),
        header: 'Phone Number',
      },
      {
        accessorKey: 'confirmed',
        id: 'confirmed',
        cell: info => (
          <ConfirmMember fullName={info.row.getValue('fullName')} />
        ),
        header: '',
      },
    ],
  },
];

function Applications() {
  const members = trpc.useQuery(['member.applicants']);

  console.log(members.data);
  return (
    <div className='grid w-full place-items-center pt-28'>
      {members.data && members.data.length < 0 ? (
        <div className='rounded-lg p-5 shadow-xl'>No New Members...</div>
      ) : (
        <TableWithData
          colDef={applicantCols}
          query={members}
        />
      )}
    </div>
  );
}

Applications.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Applications;
