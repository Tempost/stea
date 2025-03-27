import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { StatusType } from '@prisma/client';
import Form from '../form/Form';

const { Radio } = Form;

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
}

// TODO: Add error state here
const MemberType = ({ register, onClick }: Props) => (
  <fieldset className='fieldset'>
    <legend className='fieldset-legend'>Member Type*</legend>
    {Object.keys(StatusType).map(type => (
      <Radio
        key={type}
        id={type}
        label={type === 'AdultAmateur' ? 'Adult Amateur' : type}
        className='md:radio-sm'
        value={type}
        onClick={onClick}
        {...register}
      />
    ))}
  </fieldset>
);

export default MemberType;
