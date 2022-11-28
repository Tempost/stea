import type { ChangeEvent, ReactElement } from 'react';

import { DashboardLayout } from '@/components/layout';

function SubmitPoints() {
  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const headers = new Headers();
      headers.set('Content-Type', 'text/csv');

      const opts: RequestInit = {
        headers: headers,
        method: 'POST',
        mode: 'cors',
        body: event.target.files[0]
      };

      fetch('/api/dashboard/submit/points', opts).then(console.log);
    }
  }

  return (
    <div className='grid w-full place-items-center'>
      <div className='rounded-lg p-5 text-center shadow-xl'>
        <h2 className='text-xl text-red-500'>PLEASE NOTE!!</h2>
        <h3 className='text-lg text-red-500'>
          Ensure the sheet containing the points is in the correct format
          <br />
          Otherwise points might not get correctly added
        </h3>

        <input
          type='file'
          accept='.csv'
          className='file-input-bordered file-input-primary file-input file-input-xs mt-5 w-full max-w-xs lg:file-input-md'
          onChange={e => handleUpload(e)}
        />
      </div>
    </div>
  );
}

SubmitPoints.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SubmitPoints;
