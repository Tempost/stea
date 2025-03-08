import { use } from 'react';
import MemberTable from '@/components/tables/Members';
import { findMany } from '@/server/prisma/queries/shared';
import HorseTable from '@/components/tables/Horses';
import { unstable_cache } from 'next/cache';
import { setMembershipYear } from '@/utils/setmembershipyear';

const getMembers = unstable_cache(
  async () =>
    await findMany('Member', {
      where: {
        OR: [{ memberStatus: 'Life' }, { membershipEnd: setMembershipYear() }],
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
  ['Members'],
  { revalidate: 3600, tags: ['Members'] },
);

const getHorses = unstable_cache(
  async () =>
    findMany('Horse', {
      where: {
        OR: [{ regType: 'Life' }, { registrationEnd: setMembershipYear() }],
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
  ['Horses'],
  { revalidate: 3600, tags: ['Horses'] },
);

function MembersAnHorses() {
  const members = use(getMembers());

  const horses = use(getHorses());

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
