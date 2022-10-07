import { Radio, ControlledDatePicker } from '@/components/data-entry';
import { ChangeEvent, useState } from 'react';

interface Props {
  dateName: string;
}

function Under18({ dateName }: Props) {
  const [radioState, setRadioState] = useState(true);

  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    const isTrue = e.target.value === 'true' && true;
    setRadioState(!isTrue);
  }

  return (
    <>
      <div className='mt-3 w-fit'>
        <h3>Is applicant under 18*</h3>
        <Radio
          name='age'
          label='Yes'
          value='true'
          className='radio-primary'
          onChange={handleRadioChange}
        />

        <Radio
          name='age'
          label='No'
          value='false'
          className='radio-primary'
          onChange={handleRadioChange}
        />
      </div>

      <div className='w-fit'>
        <ControlledDatePicker
          placeholderText='Date of Birth'
          name={dateName}
          hidden={Boolean(radioState)}
        />
      </div>
    </>
  );
}

export default Under18;
