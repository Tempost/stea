import { UseFormRegisterReturn } from 'react-hook-form';

import Radio from '@/components/data-entry/Radio';
import { costs } from '@/utils/atoms';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FormType } from '@/types/common';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
  formType: FormType;
}

const RegistrationSelect = ({ register, onClick, formType }: Props) => (
  <section>
    <h3>Registration Type*</h3>
    <Radio
      id={`${register.name}-life`}
      label={`Annual ($${costs.Annual[formType]})`}
      value='Annual'
      className='md:radio-sm'
      onClick={onClick}
      {...register}
    />

    <Radio
      id={`${register.name}-annual`}
      label={`Life ($${costs.Life[formType]})`}
      value='Life'
      className='md:radio-sm'
      onClick={onClick}
      {...register}
    />
  </section>
);
RegistrationSelect.displayName = 'RegistrationSelection'

export default RegistrationSelect;
