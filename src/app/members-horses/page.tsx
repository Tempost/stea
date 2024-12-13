import { Suspense, use } from 'react';

import MemberTable from '@/components/tables/Members';
import { findMany } from '@/server/prisma/queries/shared';

function getMembershipEnd() {
  const currDate = new Date();
  const membershipEnd = new Date(currDate.getFullYear(), 10, 30);

  // If the current month is decemeber
  if (currDate.getMonth() == 11) {
    membershipEnd.setFullYear(membershipEnd.getFullYear() + 1);
  }

  return membershipEnd;
}

function MembersAnHorses() {
  const members = use(
    findMany('Member', {
      where: {
        OR: [{ memberStatus: 'Life' }, { membershipEnd: getMembershipEnd() }],
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
    })
  );
  return (
    <div className='md:grid md:grid-flow-col md:place-content-evenly'>
      <Suspense
        fallback={<div className='rounded-b-lg p-5 shadow-xl'>Loading...</div>}
      >
        <MemberTable
          members={members}
          search
          paginate
        />
      </Suspense>
    </div>
  );
}

export default MembersAnHorses;

//<HorseTable
//  search
//  paginate
///>
