import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio } from '@/components/data-entry';

interface Props {
  register: UseFormRegisterReturn;
}

function RegType({ register }: Props) {
  return (
    <div className='mt-3 w-fit'>
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
