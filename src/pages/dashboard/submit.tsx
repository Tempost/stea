import { z } from 'zod';
import type { ReactElement } from 'react';
import type { FieldValues } from 'react-hook-form';

import { DashboardLayout } from '@/components/layout';
import useZodForm from '@/utils/usezodform';
import { ShowModel } from '@/backend/prisma/zod';

const Submission = z.object({
  show: ShowModel,
});

function SubmitPoints() {
  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: Submission,
  });
  const { setValue, watch, register, handleSubmit, control } = methods;

  function onSubmit(values: FieldValues) {
    console.log(values);
  }

  return (
    <div className='grid w-full place-items-center'>
      <div className='rounded-lg p-5 shadow-xl'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-center text-xl text-red-500'>PLEASE NOTE!!</h2>
          <h3 className='text-center text-lg text-red-500'>
            Ensure the sheet containing the points is in the correct format
            <br />
            Otherwise points might not get correctly added
          </h3>

          <button
            className='btn-primary btn-sm btn w-full'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

SubmitPoints.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SubmitPoints;
