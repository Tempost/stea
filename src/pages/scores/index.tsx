import { ReactElement } from 'react';

import { PublicLayout } from '@/components/layout';
import RidersTable from '@/components/tables/ridercombos';

function SteaPoints() {
  return (
    <div className='w-full grid place-items-center gap-20'>
      <RidersTable title='Current Points' />

      <div className='grid place-items-center gap-5'>
        <h2 className='text-2xl'>
          Click here for more information on show points!
        </h2>
        <a
          className='btn btn-primary'
          href='/stea_points.docx'
          rel='noopener noreferrer'
        >
          Download Guidelines
        </a>
      </div>
    </div>
  );
}

SteaPoints.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaPoints;
