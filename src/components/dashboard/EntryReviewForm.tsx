import { useState } from 'react';
import Alert from '@/components/forms/Alert';
import { ZodFieldErrors } from '@/types/common';
import useZodForm from '@/utils/usezodform';
import { z } from 'zod';
import Select from '@/components/styled-ui/Select';
import { trpc } from '@/utils/trpc';
import { readableDateTime } from '@/utils/helpers';
import { Entry } from '@/server/utils';
import EntryReview from '@/components/dashboard/tables/EntryReview';
import { entryAtom } from '@/utils/atoms';
import { useAtom } from 'jotai';

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

function EntryReviewForm() {
  const [error, setError] = useState<string | ZodFieldErrors<Entry>>();
  const [success, setSuccess] = useState(false);
  const [zodErrors, setZodErrors] = useState<ZodFieldErrors<Entry>>();
  const [entries, setEntries] = useAtom(entryAtom);
  const shows = trpc.shows.all.useQuery({ where: { reviewed: false } });
  const utils = trpc.useContext().shows;

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

  return (
    <>
      <Alert
        visible={!!error}
        message={error}
      />
      <form
        id='review-form'
        onSubmit={methods.handleSubmit(handleUpload)}
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
          className={`btn-secondary btn mt-5 w-fit normal-case ${entries ? '' : 'hidden'}`}
          onClick={() => {
            setEntries(undefined);
            methods.reset();
          }}
        >
          Restart
        </button>

        <button
          type='submit'
          form='review-form'
          className={`btn-primary btn mt-5 w-fit normal-case ${
            error ? 'btn-error' : ''
          }`}
        >
          Review
        </button>
      </span>
    </>
  );
}

export default EntryReviewForm;
