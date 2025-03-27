import { useState } from 'react';
import Form from '../form/Form';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils/helpers';

const { Checkbox, Input } = Form;

interface Props {
  dateName: string;
}

function Under18({ dateName }: Props) {
  const [checked, setChecked] = useState(false);
  const { register } = useFormContext();

  return (
    <fieldset className='fieldset'>
      <Checkbox
        name='age'
        label='Is the applicant under 18?'
        value='false'
        className='md:checkbox-sm'
        checked={checked}
        onChange={() => setChecked(!checked)}
      />

      <div className={cn({ hidden: !checked })}>
        <Input
          label='Date of Birth'
          type='date'
          className='w-fit'
          {...register(dateName)}
        />
        <p className='fieldset-label bg-info/25 mt-1 w-fit px-1'>
          Membership year runs from Dec 1st to Nov 30th of each show year.
        </p>
      </div>
    </fieldset>
  );
}

export default Under18;
