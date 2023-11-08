import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Radio from '../data-entry/Radio';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
}

function RegistrationYearSelect({ register, onClick }: Props) {
  return (
    <section>
      <h3>Which year are you registering for?</h3>
      <Radio
        label='current year'
        value='curr'
        className='radio-primary radio align-middle md:radio-sm'
        onClick={onClick}
        {...register}
      />
      <Radio
        label='next year'
        value='next'
        className='radio-primary radio align-middle md:radio-sm'
        onClick={onClick}
        {...register}
      />
    </section>
  );
}

export default RegistrationYearSelect;
