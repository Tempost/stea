import { useState } from 'react';
import ControlledDatePicker from '../data-entry/Date';
import Checkbox from '../data-entry/Checkbox';

interface Props {
  dateName: string;
}

function Under18({ dateName }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Checkbox
        name='age'
        label='Is the applicant under 18?'
        value='false'
        className='checkbox checkbox-primary align-middle md:checkbox-sm'
        checked={checked}
        onChange={() => setChecked(!checked)}
      />

      <ControlledDatePicker
        name={dateName}
        hidden={!checked}
        placeholderText='Date of Birth'
        labelAlt='Membership year runs from Dec 1st to Nov 30th of each show year.'
      />
    </>
  );
}

export default Under18;
