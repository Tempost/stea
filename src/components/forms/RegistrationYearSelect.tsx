import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, useWatch } from 'react-hook-form';
import Radio from '../data-entry/Radio';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  heading: string;
  watchFieldName: string;
  register: UseFormRegisterReturn;
  // eslint-disable-next-line
  control: any;
}

function RegistrationYearSelect({
  heading,
  watchFieldName,
  register,
  onClick,
  control,
}: Props) {
  const annual = useWatch({ name: watchFieldName, control });
  const currentDate = new Date(Date.now());
  const currYear = new Date(currentDate.getFullYear(), 10, 30);
  const nextYear = new Date(currYear.getFullYear() + 1, 10, 30);

  console.log(annual);

  return (
    <section className={`${annual === 'Annual' ? '' : 'hidden'}`}>
      <h3>{heading} (New year starts Novemeber 30th)</h3>
      <Radio
        label={`Current Year (${currYear.getFullYear()})`}
        value={currYear.toString()}
        className='radio-primary radio align-middle md:radio-sm'
        onClick={onClick}
        {...register}
      />
      <Radio
        label={`Coming Year (${nextYear.getFullYear()})`}
        value={nextYear.toString()}
        className='radio-primary radio align-middle md:radio-sm'
        onClick={onClick}
        {...register}
      />
    </section>
  );
}

export default RegistrationYearSelect;
