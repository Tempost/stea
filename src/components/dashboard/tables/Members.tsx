import NewMemberForm from '@/components/forms/dashboard/NewMemberForm';
import TableWithData from '@/components/tables/BaseTable';
import { readableDateTime } from '@/utils/helpers';
import { RouterOutputs, trpc } from '@/utils/trpc';
import { ColumnDef } from '@tanstack/react-table';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type Member = RouterOutputs['members']['all'][number];

interface EmailListProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  emails: Array<string>;
}

function EmailList({ emails, className, ...props }: EmailListProps) {
  const noDupes = emails.filter(
    (item, idx, self) => idx === self.indexOf(item)
  );

  return (
    <button
      {...props}
      className={`btn-primary btn-sm btn ${className ? className : ''}`}
      onClick={() => navigator.clipboard.writeText(noDupes.join('\n'))}
    >
      Email List
    </button>
  );
}

const columns: Array<ColumnDef<Member>> = [
  {
    header: 'Members',
    columns: [
      {
        accessorKey: 'membershipDate',
        id: 'membershipDate',
        cell: info => {
          const date: Date | undefined = info.getValue();

          return date ? readableDateTime(date) : '';
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

function DashboardMembers() {
  const members = trpc.members.all.useQuery({
    orderBy: {
      memberStatusType: 'asc',
    },
    select: {
      fullName: true,
      memberStatusType: true,
      memberStatus: true,
      membershipDate: true,
      memberType: true,
      email: true,
      phone: true,
    },
  });

  return (
    <div>
      <div>
        <EmailList
          className='tooltip'
          data-tip='Copied!'
          emails={members.data ? members.data?.map(member => member.email) : []}
        />
        <NewMemberForm />
      </div>
      <TableWithData
        extraTableOpts={{
          columns,
        }}
        query={members}
        paginate
        search
      />
    </div>
  );
}

export default DashboardMembers;
