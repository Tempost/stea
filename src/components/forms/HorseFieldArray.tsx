import { useFieldArray, useFormContext } from 'react-hook-form';
import { Prisma, Status } from '@prisma/client';
import { TextInput } from '../data-entry';
import RegType from './regtype';
import { AddIcon, TrashIcon } from '../icons';

type Horses = {
  horses: Prisma.HorseCreateManyInput[];
};

export function HorseFieldArray() {
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
        Note that the horse’s registered name MUST be used when entering a show.
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
            />

            <span className='flex flex-col gap-2'>
              <TextInput
                label='Registered Name*'
                inputMode='text'
                className='input-primary input-sm'
                error={Array.isArray(errors.horses) && errors.horses.at(index)}
                {...register(`horses.${index}.horseRN` as const, {
                  required: true,
                })}
              />

              <TextInput
                label='Aka Name'
                inputMode='text'
                className='input-primary input-sm'
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
