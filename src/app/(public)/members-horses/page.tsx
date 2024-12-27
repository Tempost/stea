import { use } from 'react';

import MemberTable from '@/components/tables/Members';
import { findMany } from '@/server/prisma/queries/shared';
import HorseTable from '@/components/tables/Horses';

function getAnnualEndDate() {
  const currDate = new Date();
  const cutOffDate = new Date(currDate.getFullYear(), 10, 30);

  // If the current month is decemeber
  if (currDate.getMonth() == 11) {
    cutOffDate.setFullYear(cutOffDate.getFullYear() + 1);
  }

  return cutOffDate;
}

function MembersAnHorses() {
  const members = use(
    findMany('Member', {
      where: {
        OR: [{ memberStatus: 'Life' }, { membershipEnd: getAnnualEndDate() }],
      },
      select: {
        fullName: true,
        memberStatusType: true,
        memberStatus: true,
      },
      orderBy: [
        {
          memberStatusType: 'asc',
        },
        { memberStatus: 'asc' },
      ],
    }),
  );

  const horses = use(
    findMany('Horse', {
      where: {
        OR: [{ regType: 'Life' }, { registrationEnd: getAnnualEndDate() }],
      },
      select: {
        horseRN: true,
        regType: true,
        owner: true,
      },
      orderBy: {
        regType: 'asc',
      },
    }),
  );

  return (
    <div className='md:grid md:grid-flow-col md:place-content-evenly'>
      <MemberTable
        members={members}
        search
        paginate
      />
      <HorseTable
        horses={horses}
        search
        paginate
      />
    </div>
  );
}

export default MembersAnHorses;
