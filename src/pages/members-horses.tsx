import { ReactElement } from 'react';

import { PublicLayout } from '@/components/layout/PublicLayout';
import HorseTable from '@/components/tables/Horses';
import MemberTable from '@/components/tables/Members';

function MembersAnHorses() {
  return (
    <div className='md:grid md:grid-flow-col md:place-content-evenly'>
      <MemberTable search paginate />
      <HorseTable search paginate />
    </div>
  );
}

MembersAnHorses.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default MembersAnHorses;
