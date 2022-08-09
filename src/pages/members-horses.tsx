import { ReactElement } from 'react';
import _ from 'lodash';

import { PublicLayout } from '@/components/layout';
import { MemberTable } from '@/components/tables';

function MembersAnHorses() {
  return (
    <div className='pt-28 w-full grid place-items-center'>
      <MemberTable />
    </div>
  );
}
MembersAnHorses.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default MembersAnHorses;
