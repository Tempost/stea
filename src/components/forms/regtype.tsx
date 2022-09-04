import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio } from '@/components/data-entry';
import { MouseEventHandler } from 'react';

interface Props {
  register: UseFormRegisterReturn;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function RegType({ register, onClick }: Props) {
  return (
    <div
      className='mt-3 w-fit'
      onClick={onClick}
    >
      <h3>Registration Type*</h3>
      <Radio
        label='Annual'
        value='Annual'
        className='radio radio-primary radio-sm'
        {...register}
      />

      <Radio
        label='Life'
        value='Life'
        className='radio radio-primary radio-sm'
        {...register}
      />
    </div>
  );
}

export default RegType;
