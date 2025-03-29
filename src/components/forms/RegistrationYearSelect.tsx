import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, useWatch } from 'react-hook-form';
import Form from '../form/Form';

const { Radio } = Form;

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
      <fieldset className='fieldset'>
        <legend className='fieldset-legend'>
          {heading} (New year starts November 30th)
        </legend>
        <Radio
          id={`${register.name}-${curr.getFullYear()}`}
          label={`Current Year (${curr.getFullYear()})`}
          value={curr.toString()}
          className='md:radio-sm align-middle'
          onClick={onClick}
          {...register}
        />
        <Radio
          id={`${register.name}-${next.getFullYear()}`}
          label={`Coming Year (${next.getFullYear()})`}
          value={next.toString()}
          className='md:radio-sm align-middle'
          onClick={onClick}
          {...register}
        />
      </fieldset>
    );
  } else {
    return null;
  }
}

export default RegistrationYearSelect;
