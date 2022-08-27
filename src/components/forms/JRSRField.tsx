import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio } from '@/components/data-entry';

interface Props {
  register: UseFormRegisterReturn;
  watch: string;
}

const JRSR = ({ register, watch }: Props) => {
  const isJR = watch === 'JR';

  return (
    <div className='mt-3 w-fit'>
      <h3>Is applicant under 18*</h3>
      <Radio
        label='Yes'
        value='JR'
        className='radio radio-primary radio-sm'
        {...register}
      />

      <Radio
        label='No'
        value='SR'
        className='radio radio-primary radio-sm'
        {...register}
      />
    </div>
  );
};

export default JRSR;
