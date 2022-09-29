import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio, ControlledDatePicker } from '@/components/data-entry';

interface Props {
  radioRegister: UseFormRegisterReturn;
  dateName: string;
  watch: string;
}

function JRSR({ radioRegister, dateName, watch }: Props) {
  const isJR = watch === 'JR';

  return (
    <div className='mt-3 w-fit'>
      <h3>Is applicant under 18*</h3>
      <Radio
        label='Yes'
        value='JR'
        className='radio-primary'
        {...radioRegister}
      />

      <Radio
        label='No'
        value='SR'
        className='radio-primary'
        {...radioRegister}
      />

      {isJR ? (
        <ControlledDatePicker
          placeholderText='Date of Birth'
          name={dateName}
        />
      ) : null}
    </div>
  );
}

export default JRSR;
