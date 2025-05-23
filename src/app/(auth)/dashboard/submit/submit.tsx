'use client';
import { useReducer } from 'react';
import { CSVEntry } from '@/server/utils';
import { isZodFieldError, ZodFieldErrors } from '@/types/common';
import { cn, readableDateTime } from '@/utils/helpers';
import useZodForm from '@/utils/usezodform';
import { z } from 'zod';
import Alert from '@/components/styled-ui/Alert';
import { EntryReviewType, isEntrySubmissionType } from '@/utils/zodschemas';
import { Button } from '@/components/styled-ui/Button';
import { Show } from '@prisma/client';
import Form from '@/components/form/Form';
import EntryReview from './EntryReview';

const ShowSubmitFormValue = z.object({
  showUID: z.string().cuid(),
  file: z.any().refine(
    file => {
      return file[0]?.type === 'text/csv';
    },
    { message: 'A CSV file must be selected first.' },
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

function reducer(
  state: SubmitPointsState,
  action: ComponentActions,
): SubmitPointsState {
  let newState = state;
  switch (action.type) {
    case 'REVIEW':
      if (isEntrySubmissionType(action.data)) {
        newState = {
          ...state,
          error: undefined,
          reviewStatus: 'SUCCESS',
          entries: action.data,
          totalEntries: action.totalEntries ?? 0,
        };
      }
      break;
    case 'SUBMIT':
      newState = {
        ...state,
        submissionStatus: 'SUCCESS',
      };
      break;
    case 'ERROR':
      if (state.reviewStatus === 'INIT') {
        if (isSubmitPointsError(action.data)) {
          newState = {
            ...state,
            reviewStatus: 'ERROR',
            error: action.data,
          };
        }
      }

      if (state.submissionStatus === 'INIT') {
        if (isSubmitPointsError(action.data)) {
          newState = {
            ...state,
            submissionStatus: 'ERROR',
            error: action.data,
          };
        }
      }
      break;
    case 'RESET':
      newState = initState;
      break;
    default:
      throw new Error(`Unsupported action :: ${action.type}`);
  }

  return newState;
}

function SubmitPoints({ shows }: { shows: Array<Show> }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const form = useZodForm({
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

    fetch('/api/dashboard/submit/review', opts).then(async res => {
      if (!res.ok) {
        const error = await res.json().then(data => data);
        dispatch({ type: 'RESET' });
        if (isZodFieldError<CSVEntry>(error.data)) {
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

  function handleFinalSubmit() {
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
          showUID: form.getValues().showUID,
        }),
      opts,
    ).then(res => {
      if (res.ok) {
        dispatch({ type: 'RESET' });
      }
    });
  }

  return (
    <>
      <Alert
        icon='error'
        hidden={!!state.error?.message}
        message={state.error?.message}
      />

      <Form
        id='review-form'
        form={form}
        onSubmit={handleReviewSubmit}
        className='w-fit place-self-center'
      >
        <fieldset
          id='show-submit'
          className='space-y-2'
        >
          {shows && (
            <Form.Select
              id='show-select'
              label='Select Show'
              aria-label='Select Show'
              defaultValue=''
              {...form.register('showUID', { required: true })}
            >
              <option
                value=''
                disabled
              ></option>
              {shows.map(show => (
                <option
                  key={show.uid}
                  value={show.uid}
                >
                  {show.showName + ' ' + readableDateTime(show.showDate)}
                </option>
              ))}
            </Form.Select>
          )}
          <Form.FileInput
            type='file'
            accept='text/csv'
            id='file-input'
            label='Upload Points sheet'
            aria-label='Upload Points sheet'
            size='md'
            {...form.register('file', { required: true })}
          />
        </fieldset>
      </Form>

      {state.entries && <EntryReview entries={state.entries} />}

      <div
        className={cn('flex', {
          'justify-between': state.entries,
          'justify-end': !state.entries,
        })}
      >
        <Button
          type='reset'
          form='review-form'
          className={cn({
            hidden: state.entries === undefined,
          })}
          variant='secondary'
          onClick={() => {
            dispatch({ type: 'RESET' });
            form.reset();
          }}
        >
          Restart
        </Button>

        {state.entries ? (
          <Button
            variant='primary'
            onClick={() => handleFinalSubmit()}
          >
            Submit
          </Button>
        ) : (
          <Button
            type='submit'
            form='review-form'
            variant='primary'
            className={cn({
              'btn-error': state.entries !== undefined,
            })}
          >
            Review
          </Button>
        )}
      </div>
    </>
  );
}

export default SubmitPoints;
