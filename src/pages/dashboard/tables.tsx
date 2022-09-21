import { ReactElement, useState } from 'react';

import { DashboardLayout } from '@/components/layout';
import { HorseTable, MemberTable, OwnerTable, TableSelection } from '@/components/tables';
import RidersTable from '@/components/tables/ridercombos';

const activeBtn = 'btn btn-active';

function Tables() {
  const [table, setTable] = useState<TableSelection>('members');

  const memberSelected = table === 'members';
  const horseSelected = table === 'horses';
  const ownersSelected = table === 'owners';
  const combosSelected = table === 'riders';

  const tables = {
    members: <MemberTable />,
    horses: <HorseTable />,
    owners: <OwnerTable />,
    riders: <RidersTable />,
  }

  return (
    <div className='pt-28 grid place-items-center gap-10'>
      <div
        className='btn-group'
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
      </div>
      {tables[table]}
    </div>
  );
}

Tables.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tables;
