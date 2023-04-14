import { DashboardLayout } from '@/components/layout/DashboardLayout';
import EntryReviewForm from '@/components/dashboard/EntryReviewForm';
import { entryAtom } from '@/utils/atoms';

import type { ReactElement } from 'react';
import { useAtomValue } from 'jotai';
import FinalSubmissionForm from '@/components/dashboard/FinalSubmissionForm';

function SubmitPoints() {
  const entries = useAtomValue(entryAtom);
  return (
    <div className='mx-auto sm:w-fit'>
      <div className='rounded-lg p-5 shadow-xl'>
        <EntryReviewForm />
        {entries && <FinalSubmissionForm entries={entries} />}
      </div>
    </div>
  );
}

SubmitPoints.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SubmitPoints;
