import { useState } from 'react';

import type { ReactElement } from 'react';

import { DashboardLayout } from '@/components/layout';
import Alert from '@/components/forms/Alert';
import { Entry } from '@/utils/zodschemas';
import { ZodFieldErrors } from '@/types/common';
import useZodForm from '@/utils/usezodform';
import { z } from 'zod';
import { Select } from '@/components/data-entry';
import { trpc } from '@/utils/trpc';
import { createSelectOpts } from '@/utils/helpers';

interface SubmitError {
  message: string | ZodFieldErrors<Entry>;
}

export function isSubmitError(o: any): o is SubmitError {
  return o.message;
}

const ShowSubmitFormValue = z.object({
  showUID: z.string().cuid(),
  file: z.any().refine(
    file => {
      return file[0]?.type === 'text/csv';
    },
    { message: 'Only csv files are allowed.' }
  ),
});

type FormValues = z.infer<typeof ShowSubmitFormValue>;

function SubmitPoints() {
  const [error, setError] = useState<string | ZodFieldErrors<Entry>>();
  const [success, setSuccess] = useState(false);
  const shows = trpc.shows.all.useQuery();

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: ShowSubmitFormValue,
  });

  function handleUpload(formValues: FormValues) {
    const headers = new Headers();
    headers.set('Accept', '*/*');
    headers.set('Content-Type', 'text/csv');

    const opts: RequestInit = {
      headers: headers,
      method: 'POST',
      mode: 'cors',
      body: formValues.file[0],
    };

    fetch(
      '/api/dashboard/submit/points?' +
        new URLSearchParams({
          showUID: formValues.showUID,
        }),
      opts
    ).then(async res => {
      if (!res.ok) {
        const error = await res.json().then(data => data);
        if (!isSubmitError(error)) {
          setError('Something unexpected happened trying to parse the csv.');
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
      setSuccess(true);
    });
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

        <form onSubmit={methods.handleSubmit(handleUpload)}>
          <div className='mx-auto flex flex-col items-center gap-5'>
            {shows.isSuccess && (
              <Select
                className='select-primary select select-sm lg:select-md'
                options={createSelectOpts(shows.data)}
                {...methods.register('showUID', { required: true })}
              />
            )}

            <input
              type='file'
              accept='text/csv'
              className='file-input-bordered file-input-primary file-input file-input-xs mt-5 w-fit max-w-xs lg:file-input-md'
              {...methods.register('file', { required: true })}
            />

            <button
              type='submit'
              className={`btn-primary btn mt-5 w-fit normal-case ${
                success ? 'bg-success' : error ? 'btn-error' : ''
              }`}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

SubmitPoints.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SubmitPoints;
