import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio } from '@/components/data-entry';
import { useSetAtom } from 'jotai';
import { updateFormState } from '@/utils/atoms';
import { Status } from '@prisma/client';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegisterReturn;
  noAtomUpdate?: boolean;
}

function RegType({ register, noAtomUpdate, onClick }: Props) {
  const update = useSetAtom(updateFormState);

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    !noAtomUpdate &&
      update({ type: 'STATUS', payload: e.target.value as Status });
  }

  return (
    <section
      className='mt-3 w-fit'
      onChange={handleRadioClick}
    >
      <h3>Registration Type*</h3>
      <Radio
        label='Annual'
        value='Annual'
        className='radio-primary'
        onClick={onClick}
        {...register}
      />

      <Radio
        label='Life'
        value='Life'
        className='radio-primary'
        onClick={onClick}
        {...register}
      />
    </section>
  );
}

export default RegType;
