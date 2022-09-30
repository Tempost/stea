import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';

import { Radio, ControlledDatePicker } from '@/components/data-entry';

interface Props {
  radioRegister: UseFormRegisterReturn;
  dateName: string;
  watchName: string;
}

function JRSR({ radioRegister, dateName, watchName }: Props) {
  const { watch } = useFormContext();
  const isJR = watch(watchName, 'SR');

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

      {isJR === 'JR' ? (
        <ControlledDatePicker
          placeholderText='Date of Birth'
          name={dateName}
        />
      ) : null}
    </div>
  );
}

export default JRSR;
