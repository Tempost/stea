import { ReactElement, useState } from 'react';
import _ from 'lodash';

import { DashboardLayout } from '@/components/layout';
import TablePicker from '@/components/tables/tablepicker';
import type { TableSelection } from '@/components/tables';

const activeBtn = 'btn btn-active';

function Tables() {
  const [table, setTable] = useState<TableSelection>('members');

  const memberSelected = _.isEqual(table, 'members');
  const horseSelected = _.isEqual(table, 'horses');
  const ownersSelected = _.isEqual(table, 'owners');
  const pointsSelected = _.isEqual(table, 'points');
  const combosSelected = _.isEqual(table, 'ridercombos');

  return (
    <div className='grid place-items-center gap-10'>
      <div
        className='btn-group'
        //@ts-ignore TODO: why is value not on target?
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
          className={pointsSelected ? activeBtn : 'btn'}
          value='points'
        >
          Points
        </button>
        <button
          className={combosSelected ? activeBtn : 'btn'}
          value='ridercombos'
        >
          Rider Combos
        </button>
      </div>
      <TablePicker table={table} />
    </div>
  );
}

Tables.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tables;
