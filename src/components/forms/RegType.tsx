import { UseFormRegisterReturn } from 'react-hook-form';

import Radio from '@/components/data-entry/Radio';
import { useSetAtom } from 'jotai';
import { costs, updateFormState } from '@/utils/atoms';
import { Status } from '@prisma/client';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FormType } from '@/types/common';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
  noAtomUpdate?: boolean;
  formType: FormType;
}

function RegType({ register, noAtomUpdate, onClick, formType }: Props) {
  const update = useSetAtom(updateFormState);

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    !noAtomUpdate &&
      update({ type: 'STATUS', payload: e.target.value as Status });
  }

  return (
    <section onChange={handleRadioClick}>
      <h3>Registration Type*</h3>
      <Radio
        label={`Annual ($${costs.Annual[formType]})`}
        value='Annual'
        className='radio radio-primary align-middle md:radio-sm'
        onClick={onClick}
        {...register}
      />

      <Radio
        label={`Life ($${costs.Life[formType]})`}
        value='Life'
        className='radio radio-primary align-middle md:radio-sm'
        onClick={onClick}
        {...register}
      />
    </section>
  );
}

export default RegType;
