import { UseFormRegisterReturn } from 'react-hook-form';

import { costs } from '@/utils/costs';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FormType } from '@/types/common';
import Form from '../form/Form';

const { Radio } = Form;

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
  formType?: FormType;
  price?: boolean;
}

// TODO: Add error state here
const RegistrationSelect = ({
  register,
  onClick,
  formType = 'individual',
  price = false,
}: Props) => (
  <fieldset
    id='registration-type'
    className='fieldset'
  >
    <legend className='fieldset-legend'>Registration Type*</legend>
    <Radio
      id={`${register.name}-life`}
      label={`Annual ${price ? `$${costs.Annual[formType]}` : ''}`}
      value='Annual'
      className='md:radio-sm'
      onClick={onClick}
      {...register}
    />

    <Radio
      id={`${register.name}-annual`}
      label={`Life ${price ? `$${costs.Life[formType]}` : ''}`}
      value='Life'
      className='md:radio-sm'
      onClick={onClick}
      {...register}
    />
  </fieldset>
);
RegistrationSelect.displayName = 'RegistrationSelection';

export default RegistrationSelect;
