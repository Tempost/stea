import { useState } from 'react';
import { ZodError } from 'zod';

import type { ChangeEvent, ReactElement } from 'react';

import { DashboardLayout } from '@/components/layout';
import Alert from '@/components/forms/Alert';
import { Entry } from '@/utils/zodschemas';
import { ZodFieldErrors, isZodFielError } from '@/types/common';


interface SubmitError {
  message: string | ZodFieldErrors<Entry>;
}

export function isSubmitError(o: any): o is SubmitError {
  return o.message;
}

function SubmitPoints() {
  const [error, setError] = useState<string | ZodFieldErrors<Entry>>();

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const headers = new Headers();
      headers.set('Accept', '*/*');
      headers.set('Content-Type', 'text/csv');

      const opts: RequestInit = {
        headers: headers,
        method: 'POST',
        mode: 'cors',
        body: event.target.files[0],
      };

      const res = fetch('/api/dashboard/submit/points', opts).then(
        async res => {
          if (!res.ok) {
            const error = await res.json().then(data => data);
            if (!isSubmitError(error)) {
              setError('Something unxpected happend trying to parse the csv.');
              return;
            }

            if (typeof error.message === 'string') {
              setError(error.message);
              return;
            }
            
            setError(error.message);
            console.log(error.message);
            return;
          }

          setError(undefined);
          return res.json();
        }
      );
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

        <Alert
          visible={!!error}
          message={error}
        />
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
