import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Radio from '../data-entry/Radio';
import { StatusType } from '@prisma/client';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
}

function MemberType({ register, onClick }: Props) {
  return (
    <section>
      <h3>Member Type*</h3>
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
    </section>
  );
}

export default MemberType;
