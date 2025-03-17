'use client';
import Checkbox from '@/components/data-entry/Checkbox';
import { Button } from '@/components/styled-ui/Button';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';
import { Member } from '@prisma/client';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import NewMemberForm from './NewMemberForm';
import UpdateMember from './UpdateMember';

interface EmailListProps {
  emails: string;
}

function EmailList({ emails }: EmailListProps) {
  return (
    <Button
      variant='primary'
      size='sm'
      className='tooltip tooltip-bottom tooltip-primary'
      data-tip='Copied!'
      onClick={() => navigator.clipboard.writeText(emails)}
    >
      Email List
    </Button>
  );
}

const columns: Array<ColumnDef<Member>> = [
  {
    id: 'header',
    columns: [
      {
        id: 'select',
        cell: ({ row }) => (
          <Checkbox
            id={row.id}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
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
    ],
  },
];

function DashboardMembers({ members }: { members: Array<Member> }) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const emails = useCallback(
    () =>
      members
        .map(member => member.email)
        .filter((item, idx, self) => idx === self.indexOf(item))
        .join('\n'),
    [members],
  );

  return (
    <div>
      <TableWithData
        extraTableOpts={{
          columns,
          enableRowSelection: true,
          enableMultiRowSelection: false,
          onRowSelectionChange: setRowSelection,
          getRowId: row => row.fullName,
          state: {
            rowSelection,
          },
        }}
        extras={
          <div className='flex space-x-1'>
            <EmailList emails={emails()} />
            <NewMemberForm />
            <UpdateMember rowSelection={rowSelection} />
          </div>
        }
        data={members}
        paginate
        search
      />
    </div>
  );
}

export default DashboardMembers;
