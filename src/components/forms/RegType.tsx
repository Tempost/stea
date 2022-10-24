import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio } from '@/components/data-entry';
import { useSetAtom } from 'jotai';
import { updateFormState } from '@/utils/atoms';
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

const costs = {
  life: {
    Individual: 500,
    Business: 500,
    Horse: 150,
  },
  annual: {
    Individual: 55,
    Business: 65,
    Horse: 25,
  },
};

function RegType({ register, noAtomUpdate, onClick, formType }: Props) {
  const update = useSetAtom(updateFormState);

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    !noAtomUpdate &&
      update({ type: 'STATUS', payload: e.target.value as Status });
  }

  const annualLabel = `Annual ($${costs.annual[formType]})`;
  const lifeLabel = `Life ($${costs.life[formType]})`;

  return (
    <section
      className='mt-3 w-fit'
      onChange={handleRadioClick}
    >
      <h3>Registration Type*</h3>
      <Radio
        label={annualLabel}
        value='Annual'
        className='radio-primary'
        onClick={onClick}
        {...register}
      />

      <Radio
        label={lifeLabel}
        value='Life'
        className='radio-primary'
        onClick={onClick}
        {...register}
      />
    </section>
  );
}

export default RegType;
