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
  // TODO: Find proper type for this prop
  control: any;
}

const today = new Date();
const curr = new Date(today.getFullYear(), 10, 30);
const next = new Date(today.getFullYear() + 1, 10, 30);
const from = new Date(today.getFullYear(), 8, 1);
const to = new Date(today.getFullYear(), 11, 1);

function RegistrationYearSelect({
  heading,
  watchFieldName,
  register,
  onClick,
  control,
}: Props) {
  const annual = useWatch({ name: watchFieldName, control });

  const showComponent = today >= from && today <= to;

  if (annual === 'Annual' && showComponent) {
    return (
      <section>
        <h3>{heading} (New year starts Novemeber 30th)</h3>
        <Radio
          id={`${register.name}-${curr.getFullYear()}`}
          label={`Current Year (${curr.getFullYear()})`}
          value={curr.toString()}
          className='align-middle md:radio-sm'
          onClick={onClick}
          {...register}
        />
        <Radio
          id={`${register.name}-${next.getFullYear()}`}
          label={`Coming Year (${next.getFullYear()})`}
          value={next.toString()}
          className='align-middle md:radio-sm'
          onClick={onClick}
          {...register}
        />
      </section>
    );
  } else {
    return <></>;
  }
}

export default RegistrationYearSelect;
