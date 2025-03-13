'use client';
import { Button } from '@/components/styled-ui/Button';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';
import { Member } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback } from 'react';
import NewMemberForm from './NewMemberForm';

interface EmailListProps {
  emails: Array<string>;
}

function EmailList({ emails }: EmailListProps) {
  const deDupe = useCallback(
    () => emails.filter((item, idx, self) => idx === self.indexOf(item)),
    [emails],
  );

  return (
    <Button
      variant='primary'
      size='sm'
      className='tooltip tooltip-primary'
      data-tip='Copied!'
      onClick={() => navigator.clipboard.writeText(deDupe().join('\n'))}
    >
      Email List
    </Button>
  );
}

const columns: Array<ColumnDef<Member>> = [
  {
    header: 'Members',
    columns: [
      {
        accessorKey: 'membershipDate',
        id: 'membershipDate',
        cell: info =>
          info.getValue() ? readableDateTime(info.getValue()) : '',
        header: () => <span> Join Date </span>,
      },
      {
        accessorKey: 'membershipEnd',
        id: 'membershipEnd',
        cell: info =>
          info.getValue() ? readableDateTime(info.getValue()) : '',
        header: () => <span> Registration Ends </span>,
      },
      {
        accessorKey: 'fullName',
        id: 'fullName',
        cell: info => info.getValue(),
        header: () => <span> Name </span>,
      },
      {
        accessorKey: 'memberStatusType',
        id: 'MemberStatusType',
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
      {
        accessorKey: 'memberType',
        id: 'memberType',
        cell: info => info.getValue(),
        header: () => <span> Type </span>,
      },
      {
        accessorKey: 'email',
        id: 'email',
        cell: info => info.getValue(),
        header: () => <span> Email </span>,
      },
      {
        accessorKey: 'phone',
        id: 'phone',
        cell: info => info.getValue(),
        header: () => <span> Phone </span>,
      },
      {
        accessorKey: 'firstName',
        id: 'firstName',
        cell: info => info.getValue(),
        header: () => <span> Contact </span>,
      },
    ],
  },
];

function DashboardMembers({ members }: { members: Array<Member> }) {
  return (
    <div>
      <div>
        <EmailList emails={members.map(member => member.email)} />
        <NewMemberForm />
      </div>
      <TableWithData
        extraTableOpts={{
          columns,
        }}
        data={members}
        paginate
        search
      />
    </div>
  );
}

export default DashboardMembers;
