import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Radio } from '../data-entry';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
}

function MemberType({ register, onClick }: Props) {
  return (
    <section className='mt-3 w-fit'>
      <h3>Member Type*</h3>
      <Radio
        label='Adult Amateur'
        value='AdultAmateur'
        className='radio-primary'
        onClick={onClick}
        {...register}
      />

      <Radio
        label='Professional'
        value='Professional'
        className='radio-primary'
        onClick={onClick}
        {...register}
      />

      <Radio
        label='Junior'
        value='Junior'
        className='radio-primary'
        onClick={onClick}
        {...register}
      />
    </section>
  );
}

export default MemberType;
