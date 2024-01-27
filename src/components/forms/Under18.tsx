import { ChangeEvent, useState } from 'react';
import ControlledDatePicker from '../data-entry/Date';
import Checkbox from '../data-entry/Checkbox';

interface Props {
  dateName: string;
}

function Under18({ dateName }: Props) {
  const [isUnder18, setIsUnder18] = useState(true);

  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    setIsUnder18(e.target.checked);
  }

  return (
    <>
      <Checkbox
        name='age'
        label='Is the applicant under 18?'
        value='false'
        defaultValue='off'
        className='checkbox-primary checkbox align-middle md:checkbox-sm'
        onChange={handleRadioChange}
      />

      <ControlledDatePicker
        name={dateName}
        hidden={isUnder18}
        placeholderText='Date of Birth'
        labelAlt='Membership year runs from Dec 1st to Nov 30th of each show year.'
      />
    </>
  );
}

export default Under18;
