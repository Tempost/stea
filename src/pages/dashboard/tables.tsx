import dynamic from 'next/dynamic';
import { ReactElement, useState } from 'react';

import { DashboardLayout } from '@/components/layout/DashboardLayout';

const DynamicShowsTable = dynamic(
  () => import('@/components/dashboard/tables/Shows')
);

const DynamicHorsesTable = dynamic(
  () => import('@/components/dashboard/tables/Horses')
);

const DynamicMembersTable = dynamic(
  () => import('@/components/dashboard/tables/Members')
);

const DynamicOwnersTable = dynamic(
  () => import('@/components/dashboard/tables/Owners')
);

const DynamicRidersTable = dynamic(
  () => import('@/components/dashboard/tables/Riders')
);

const DynamicBoardMembers = dynamic(
  () => import('@/components/dashboard/tables/BoardMembers')
);

type TableSelection =
  | 'members'
  | 'horses'
  | 'owners'
  | 'riders'
  | 'shows'
  | 'boardmembers';

function Tables() {
  const [table, setTable] = useState<TableSelection>('members');

  const memberSelected = table === 'members';
  const horseSelected = table === 'horses';
  const ownersSelected = table === 'owners';
  const combosSelected = table === 'riders';
  const showsSelected = table === 'shows';
  const boardmembersSelected = table === 'boardmembers';

  const tables = {
    members: <DynamicMembersTable />,
    horses: <DynamicHorsesTable />,
    owners: <DynamicOwnersTable />,
    riders: <DynamicRidersTable />,
    shows: <DynamicShowsTable />,
    boardmembers: <DynamicBoardMembers />,
  };

  return (
    <div className='flex w-full flex-col gap-10'>
      <div
        className='btn-group mx-auto'
        //@ts-expect-error wtf does this even mean
        onClick={e => setTable(e.target.value)}
      >
        <button
          className={`btn btn-sm p-1 lg:btn-md ${
            memberSelected && 'btn-active'
          }`}
          value='members'
        >
          Members
        </button>
        <button
          className={`btn btn-sm p-1 lg:btn-md ${
            horseSelected && 'btn-active'
          }`}
          value='horses'
        >
          Horses
        </button>
        <button
          className={`btn btn-sm p-1 lg:btn-md ${
            ownersSelected && 'btn-active'
          }`}
          value='owners'
        >
          Owners
        </button>
        <button
          className={`btn btn-sm p-1 lg:btn-md ${
            combosSelected && 'btn-active'
          }`}
          value='riders'
        >
          Riders
        </button>
        <button
          className={`btn btn-sm p-1 lg:btn-md ${
            showsSelected && 'btn-active'
          }`}
          value='shows'
        >
          Shows
        </button>
        <button
          className={`btn btn-sm p-1 lg:btn-md ${
            boardmembersSelected && 'btn-active'
          }`}
          value='boardmembers'
        >
          Board Members
        </button>
      </div>
      {tables[table]}
    </div>
  );
}

Tables.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tables;
