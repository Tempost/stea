import { ReactElement, useState } from 'react';

import { DashboardLayout } from '@/components/layout';
import {
  HorseTable,
  MemberTable,
  OwnerTable,
  ShowsTable,
  TableSelection,
} from '@/components/tables';
import RidersTable from '@/components/tables/ridercombos';

const activeBtn = 'btn btn-active';

function Tables() {
  const [table, setTable] = useState<TableSelection>('members');

  const memberSelected = table === 'members';
  const horseSelected = table === 'horses';
  const ownersSelected = table === 'owners';
  const combosSelected = table === 'riders';
  const showsSelected = table === 'shows';

  const tables = {
    members: <MemberTable search={true} />,
    horses: <HorseTable search={true} />,
    owners: <OwnerTable search={true} />,
    riders: <RidersTable search={true} />,
    shows: <ShowsTable search={true} />,
  };

  return (
    <>
      <div
        className='grid grid-flow-col place-content-center btn-group pb-10'
        //@ts-ignore
        onClick={e => setTable(e.target.value)}
      >
        <button
          className={memberSelected ? activeBtn : 'btn'}
          value='members'
        >
          Members
        </button>
        <button
          className={horseSelected ? activeBtn : 'btn'}
          value='horses'
        >
          Horses
        </button>
        <button
          className={ownersSelected ? activeBtn : 'btn'}
          value='owners'
        >
          Owners
        </button>
        <button
          className={combosSelected ? activeBtn : 'btn'}
          value='riders'
        >
          Riders
        </button>
        <button
          className={showsSelected ? activeBtn : 'btn'}
          value='shows'
        >
          Shows
        </button>
      </div>
      {tables[table]}
    </>
  );
}

Tables.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tables;
