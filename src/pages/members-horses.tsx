import { ReactElement } from 'react';

import { PublicLayout } from '@/components/layout/PublicLayout';
import HorseTable from '@/components/tables/Horses';
import MemberTable from '@/components/tables/Members';

function MembersAnHorses() {
  // TODO: Fade Image into background
  // <Image layout='fill' src='/membersandhorses.jpg'/>
  return (
    <div className='md:grid md:grid-flow-col md:place-content-evenly'>
      <MemberTable search />
      <HorseTable search />
    </div>
  );
}

MembersAnHorses.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default MembersAnHorses;
