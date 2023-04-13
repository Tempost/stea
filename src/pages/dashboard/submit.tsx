import { DashboardLayout } from '@/components/layout/DashboardLayout';
import EntryReviewForm from '@/components/dashboard/EntryReviewForm';

import type { ReactElement } from 'react';

function SubmitPoints() {
  return (
    <div className='grid w-full place-items-center'>
      <div className='rounded-lg p-5 text-center shadow-xl'>
        <h2 className='text-xl text-red-500'>PLEASE NOTE!!</h2>
        <h3 className='text-lg text-red-500'>
          Ensure the sheet containing the points is in the correct format (csv)
          <br />
          Otherwise points might not get correctly added
        </h3>
        <EntryReviewForm />
      </div>
    </div>
  );
}

SubmitPoints.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SubmitPoints;
