import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Radio, ControlledDatePicker } from '@/components/data-entry';

interface Props {
  radioRegister: UseFormRegisterReturn;
  dateRegister: UseFormRegisterReturn;
  error?: FieldError;
  watch: string;
}

const JRSR = ({ radioRegister, dateRegister, error, watch }: Props) => {
  const isJR = watch === 'JR';

  return (
    <div className='mt-3 w-fit'>
      <h3>Is applicant under 18*</h3>
      <Radio
        label='Yes'
        value='JR'
        className='radio radio-primary radio-sm'
        {...radioRegister}
      />

      <Radio
        label='No'
        value='SR'
        className='radio radio-primary radio-sm'
        {...radioRegister}
      />

      {isJR ? <ControlledDatePicker register={dateRegister} /> : null}
    </div>
  );
};

export default JRSR;
