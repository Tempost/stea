'use client';
import { useReducer } from 'react';
import Select from '@/components/styled-ui/Select';
import { CSVEntry } from '@/server/utils';
import { isZodFieldError, ZodFieldErrors } from '@/types/common';
import { cn, readableDateTime } from '@/utils/helpers';
import useZodForm from '@/utils/usezodform';
import { z } from 'zod';
import Alert from '@/components/forms/Alert';
import EntryReview from '@/components/dashboard/tables/EntryReview';
import { EntryReviewType, isEntrySubmissionType } from '@/utils/zodschemas';
import { Button } from '@/components/styled-ui/Button';
import { revalidateTag } from 'next/cache';
import { Show } from '@prisma/client';
import FileInput from '@/components/styled-ui/FileInput';

const ShowSubmitFormValue = z.object({
  showUID: z.string().cuid(),
  file: z.any().refine(
    file => {
      return file[0]?.type === 'text/csv';
    },
    { message: 'Only csv files are allowed.' },
  ),
});

type StatusMessage = 'SUCCESS' | 'ERROR' | 'INIT';
interface ComponentActions {
  type: 'REVIEW' | 'SUBMIT' | 'RESET' | 'ERROR';
  data?: string | SubmitPointsError | Array<EntryReviewType>;
  totalEntries?: number;
}

interface SubmitPointsError {
  message: string;
  errors?: ZodFieldErrors<CSVEntry>;
}

interface SubmitPointsState {
  reviewStatus: StatusMessage;
  submissionStatus: StatusMessage;
  entries: Array<EntryReviewType> | undefined;
  totalEntries: number;
  error: SubmitPointsError | undefined;
}

const initState: SubmitPointsState = {
  reviewStatus: 'INIT',
  submissionStatus: 'INIT',
  entries: undefined,
  error: undefined,
  totalEntries: 0,
};

type FormValues = z.infer<typeof ShowSubmitFormValue>;

function isSubmitPointsError(o: any): o is SubmitPointsError {
  return !!o && o?.message !== undefined;
}

// TODO: Fix types in this reducer function
function reducer(
  state: SubmitPointsState,
  action: ComponentActions,
): SubmitPointsState {
  switch (action.type) {
    case 'REVIEW':
      if (isEntrySubmissionType(action.data)) {
        return {
          ...state,
          error: undefined,
          reviewStatus: 'SUCCESS',
          entries: action.data,
          totalEntries: action.totalEntries ?? 0,
        };
      }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    case 'RESET':
      return initState;
    default:
      throw new Error(`Unsupported action :: ${action.type}`);
  }
}

function SubmitPoints({ shows }: { shows: Array<Show> }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: ShowSubmitFormValue,
  });

  function handleReviewSubmit(formValues: FormValues) {
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
        if (isZodFieldError<CSVEntry>(error.data)) {
          console.log(error.data);
          dispatch({
            type: 'ERROR',
            data: {
              message: 'An entry does not conform to the legend.',
              errors: error.data.filter(
                (e: { success: boolean }) => !e.success,
              ),
            },
          });
          return;
        }

        dispatch({
          type: 'ERROR',
          data: {
            message: error.message,
            errors: error,
          },
        });
        console.log(error);
        return;
      }

      await res.json().then(res => {
        dispatch({
          type: 'REVIEW',
          data: res.data,
          totalEntries: res.totalEntryCount,
        });
      });
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
      opts,
    ).then(res => {
      if (res.ok) {
        dispatch({ type: 'RESET' });
        revalidateTag('shows');
      }
    });
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
          onSubmit={methods.handleSubmit(handleReviewSubmit)}
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
              {shows && (
                <Select
                  id='show-select'
                  {...methods.register('showUID', { required: true })}
                >
                  {shows.map(show => (
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
              <FileInput
                type='file'
                accept='text/csv'
                id='file-input'
                className='file-input-primary file-input-xs lg:file-input-md'
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
          <Button
            type='reset'
            form='review-form'
            className={cn('mt-5 w-fit normal-case', {
              hidden: state.entries !== undefined,
            })}
            variant='secondary'
            onClick={() => {
              dispatch({ type: 'RESET' });
              methods.reset();
            }}
          >
            Restart
          </Button>

          {state.entries ? (
            <Button onClick={() => methods.handleSubmit(handleFinalSubmit)} />
          ) : (
            <Button
              type='submit'
              form='review-form'
              className={cn('mt-5 w-fit normal-case', {
                'btn-error': state.entries !== undefined,
              })}
            >
              Review
            </Button>
          )}
        </span>
      </div>
    </div>
  );
}

export default SubmitPoints;
