import { DashboardLayout } from '@/components/layout/DashboardLayout';

import { ReactElement, useReducer, useState } from 'react';
import Select from '@/components/styled-ui/Select';
import { Entry } from '@/server/utils';
import { isZodFieldError, ZodFieldErrors } from '@/types/common';
import { readableDateTime } from '@/utils/helpers';
import useZodForm from '@/utils/usezodform';
import { z } from 'zod';
import Alert from '@/components/forms/Alert';
import EntryReview from '@/components/dashboard/tables/EntryReview';
import { trpc } from '@/utils/trpc';
import { EntryReviewType, isEntrySubmissionType } from '@/utils/zodschemas';
import PointsPayment from '@/components/dashboard/PointsPayment';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

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

type StatusMessage = 'SUCCESS' | 'ERROR' | 'INIT';
interface ComponentActions {
  type: 'REVIEW' | 'SUBMIT' | 'RESET' | 'ERROR';
  data?: string | SubmitPointsError | EntryReviewType[];
}

interface SubmitPointsError {
  message: string;
  errors?: ZodFieldErrors<Entry>;
}

interface SubmitPointsState {
  reviewStatus: StatusMessage;
  submissionStatus: StatusMessage;
  entries: EntryReviewType[] | undefined;
  error: SubmitPointsError | undefined;
}

const initState: SubmitPointsState = {
  reviewStatus: 'INIT',
  submissionStatus: 'INIT',
  entries: undefined,
  error: undefined,
};

type FormValues = z.infer<typeof ShowSubmitFormValue>;

function isSubmitPointsError(o: any): o is SubmitPointsError {
  return !!o && o?.message !== undefined;
}

function reducer(
  state: SubmitPointsState,
  action: ComponentActions
): SubmitPointsState {
  switch (action.type) {
    case 'REVIEW':
      if (isEntrySubmissionType(action.data)) {
        return {
          ...state,
          reviewStatus: 'SUCCESS',
          entries: action.data,
        };
      }
    case 'SUBMIT':
      return {
        ...state,
        submissionStatus: 'SUCCESS',
      };
    case 'ERROR':
      if (state.reviewStatus === 'INIT') {
        if (isSubmitPointsError(action.data)) {
          return {
            ...state,
            reviewStatus: 'ERROR',
            error: action.data,
          };
        }
      }

      if (state.submissionStatus === 'INIT') {
        if (isSubmitPointsError(action.data)) {
          return {
            ...state,
            submissionStatus: 'ERROR',
            error: action.data,
          };
        }
      }
    case 'RESET':
      return initState;
    default:
      throw new Error(`Unsupported action :: ${action.type}`);
  }
}

function SubmitPoints() {
  const [state, dispatch] = useReducer(reducer, initState);
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
        dispatch({ type: 'RESET' });
        if (!isZodFieldError<Entry>(error)) {
          console.error('Unexpected error: ', error);
          dispatch({
            type: 'ERROR',
            data: {
              message: 'Something unexpected happened trying to parse the csv.',
            },
          });
          return;
        }

        dispatch({
          type: 'ERROR',
          data: {
            message: 'An entry does not match legend.',
            errors: error,
          },
        });
        console.log(error);
        return;
      }
      const data = await res.json().then(data => data);
      console.log(data.data);

      dispatch({ type: 'REVIEW', data });
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
      body: JSON.stringify(state.entries),
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
          visible={!!state.error?.message}
          message={state.error?.message}
        />
        <form
          id='review-form'
          onSubmit={methods.handleSubmit(
            state.entries ? handleFinalSubmit : handlReviewSubmit
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

        {state.entries && <EntryReview entries={state.entries} />}

        <span
          className={`flex ${
            state.entries ? 'justify-between' : 'justify-end'
          }`}
        >
          <button
            type='reset'
            form='review-form'
            className={`btn-secondary btn mt-5 w-fit normal-case ${
              state.entries ? '' : 'hidden'
            }`}
            onClick={() => {
              dispatch({ type: 'RESET' });
              methods.reset();
            }}
          >
            Restart
          </button>

          <PayPalScriptProvider options={initOptions}>
            {state.entries ? (
              <PointsPayment pointsCount={state.entries.length} />
            ) : (
              <button
                type='submit'
                form='review-form'
                className={`btn-primary btn mt-5 w-fit normal-case ${
                  state.error ? 'btn-error' : ''
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
