import { DashboardLayout } from '@/components/layout/DashboardLayout';

import { ReactElement, useState } from 'react';
import Select from '@/components/styled-ui/Select';
import { Entry } from '@/server/utils';
import { ZodFieldErrors } from '@/types/common';
import { readableDateTime } from '@/utils/helpers';
import useZodForm from '@/utils/usezodform';
import { z } from 'zod';
import Alert from '@/components/forms/Alert';
import EntryReview from '@/components/dashboard/tables/EntryReview';
import { trpc } from '@/utils/trpc';
import { EntryReviewType } from '@/utils/zodschemas';
import PointsPayment from '@/components/dashboard/PointsPayment';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

// TODO: Move back to Single form approach, Create two handlers to interact
// with the two different apis review/final, review api is validation, final api upload

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

const initOptions: ReactPayPalScriptOptions = {
  'client-id':
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

// Do Something with useReducer since we have complex state?
// const state = {
//   success: false,
//   entries: undefined,
//   zodErrors: 'Errors',
//   message: 'Error message'
// }

type FormValues = z.infer<typeof ShowSubmitFormValue>;

function SubmitPoints() {
  const [entries, setEntries] = useState<EntryReviewType[] | undefined>();
  const [error, setError] = useState<string | ZodFieldErrors<Entry>>();
  const [success, setSuccess] = useState(false);
  const [zodErrors, setZodErrors] = useState<ZodFieldErrors<Entry>>();
  const shows = trpc.shows.all.useQuery({ where: { reviewed: false } });
  const utils = trpc.useContext().shows;

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: ShowSubmitFormValue,
  });

  function handlReviewSubmit(formValues: FormValues) {
    const headers = new Headers();
    headers.set('Accept', '*/*');
    headers.set('Content-Type', 'text/csv');

    const opts: RequestInit = {
      headers: headers,
      method: 'POST',
      mode: 'cors',
      body: formValues.file[0],
    };

    fetch('/api/dashboard/submit/points', opts).then(async res => {
      if (!res.ok) {
        const error = await res.json().then(data => data);
        setEntries(undefined);
        if (!isSubmitError(error)) {
          console.error('Unexpected error: ', error);
          setError('Something unexpected happened trying to parse the csv.');
          setZodErrors(error.data);
          return;
        }

        setError(error.message);
        console.log(error.message);
        return;
      }
      const data = await res.json().then(data => data);
      console.log(data.data);

      setError(undefined);
      setEntries(data.data);
      setSuccess(true);
      utils.invalidate();
    });
  }

  function handleFinalSubmit(formValues: FormValues) {
    const headers = new Headers();
    headers.set('Accept', '*/*');
    headers.set('Content-Type', 'application/json');

    const opts: RequestInit = {
      headers: headers,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(entries),
    };

    fetch(
      '/api/dashboard/submit/final?' +
        new URLSearchParams({
          showUID: formValues.showUID,
        }),
      opts
    );
  }

  return (
    <div className='mx-auto sm:w-fit'>
      <div className='rounded-lg p-5 shadow-xl'>
        <Alert
          visible={!!error}
          message={error}
        />
        <form
          id='review-form'
          onSubmit={methods.handleSubmit(
            entries ? handleFinalSubmit : handlReviewSubmit
          )}
        >
          <div className='mx-auto flex flex-col items-center space-y-2'>
            <span className='form-control'>
              <label
                htmlFor='show-select'
                aria-label={'Select Show'}
                className='label font-bold'
              >
                <span className='label-text'>Select Show</span>
              </label>
              {shows.isSuccess && (
                <Select
                  id='show-select'
                  className='select-primary select select-sm lg:select-md'
                  {...methods.register('showUID', { required: true })}
                >
                  {shows.data.map(show => (
                    <option
                      key={show.uid}
                      value={show.uid}
                    >
                      {show.showName + ' ' + readableDateTime(show.showDate)}
                    </option>
                  ))}
                </Select>
              )}

              <label
                htmlFor='file-input'
                aria-label='Upload Points sheet'
                className='label font-bold'
              >
                <span className='label-text'>Upload Points sheet</span>
              </label>
              <input
                type='file'
                accept='text/csv'
                id='file-input'
                className='file-input-primary file-input file-input-xs lg:file-input-md'
                {...methods.register('file', { required: true })}
              />
            </span>
          </div>
        </form>

        {entries && <EntryReview entries={entries} />}

        <span className={`flex ${entries ? 'justify-between' : 'justify-end'}`}>
          <button
            type='reset'
            form='review-form'
            className={`btn-secondary btn mt-5 w-fit normal-case ${
              entries ? '' : 'hidden'
            }`}
            onClick={() => {
              setEntries(undefined);
              methods.reset();
            }}
          >
            Restart
          </button>

          <PayPalScriptProvider options={initOptions}>
            {entries ? (
              <PointsPayment pointsCount={entries.length} />
            ) : (
              <button
                type='submit'
                form='review-form'
                className={`btn-primary btn mt-5 w-fit normal-case ${
                  error ? 'btn-error' : ''
                }`}
              >
                Review
              </button>
            )}
          </PayPalScriptProvider>
        </span>
      </div>
    </div>
  );
}

SubmitPoints.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SubmitPoints;
