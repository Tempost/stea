import { useFieldArray, useFormContext } from 'react-hook-form';
import { Prisma, Status } from '@prisma/client';
import RegType from './RegType';
import { AddIcon, TrashIcon } from '../icons';
import Input from '../data-entry/Input';
import RegistrationYearSelect from './RegistrationYearSelect';

type Horses = {
  horses: Array<Prisma.HorseCreateManyInput>;
};

export default function HorseFieldArray() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Horses>();

  const { fields, append, remove } = useFieldArray<Horses>({
    control,
    name: 'horses',
  });

  return (
    <section className='grid gap-2'>
      <h2 className='text-sm font-bold'>
        List the horses you are registering.
        <br />
        Note that the horse’s registered name MUST match when entering a show.
      </h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className='card card-compact bg-base-200'
        >
          <h2 className='card-title ml-3 mt-3'>
            Horse {index + 1}
            <button
              className='btn btn-link btn-xs text-red-500'
              type='button'
              onClick={() => remove(index)}
            >
              {TrashIcon}
            </button>
          </h2>

          <div className='card-body'>
            <RegType
              noAtomUpdate={true}
              register={register(`horses.${index}.regType` as const, {
                required: true,
              })}
              formType='Horse'
            />

            <RegistrationYearSelect
              heading='Which year is the registration for?'
              watchFieldName={`horses.${index}.regType` as const}
              control={control}
              register={register(`horses.${index}.registrationEnd` as const)}
            />

            <span className='flex flex-col gap-2'>
              <Input
                label='Registered Name*'
                type='text'
                altLabel='Horses registered name must be used when entering a show.'
                className='input input-bordered input-primary input-sm w-full'
                {...register(`horses.${index}.horseRN` as const, {
                  required: true,
                })}
              />

              <Input
                label='Barn Name'
                type='text'
                className='input input-bordered input-primary input-sm w-full'
                {...register(`horses.${index}.horseAKA` as const)}
              />
            </span>
          </div>
        </div>
      ))}

      <p className='text-xl font-semibold text-error'>
        {errors.horses?.message}
      </p>
      <button
        className='btn btn-secondary btn-xs mb-5 w-full'
        type='button'
        onClick={() =>
          append({
            horseRN: '',
            horseAKA: '',
            regType: 'Annual' as Status,
          })
        }
      >
        {AddIcon} Add Horse
      </button>
    </section>
  );
}
