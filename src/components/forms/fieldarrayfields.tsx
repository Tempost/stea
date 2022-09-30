import { useFieldArray, useFormContext } from 'react-hook-form';
import { Prisma, Status } from '@prisma/client';
import { TextInput } from '../data-entry';
import RegType from './regtype';
import { AddIcon, TrashIcon } from '../icons';

type Horses = {
  horses: Prisma.HorseCreateManyInput[];
};

type RiderCombos = {
  riderCombos: Prisma.RiderComboCreateManyInput[];
};

export function HorseFieldArray() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Horses>();

  const { fields, append, remove } = useFieldArray<Horses>({
    control,
    shouldUnregister: true,
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
              className='btn btn-link text-red-500 btn-xs'
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
                className='input-sm input-primary'
                error={Array.isArray(errors.horses) && errors.horses.at(index)}
                {...register(`horses.${index}.horseRN` as const, {
                  required: true,
                })}
              />

              <TextInput
                label='Aka Name'
                inputMode='text'
                className='input-sm input-primary'
                {...register(`horses.${index}.horseAKA` as const)}
              />
            </span>
          </div>
        </div>
      ))}

      <p className='text-error text-xl font-semibold'>
        {errors.horses?.message}
      </p>
      <button
        className='btn btn-secondary btn-xs w-full'
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

export function RiderComboFieldArray() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RiderCombos>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'riderCombos',
  });

  return (
    <section className='grid gap-5'>
      <h2 className='text-sm font-bold'>
        List <strong>ALL</strong> rider/horse combination(s).
        <br />
        The rider/horse combinations can be changed at any time during the
        membership year.
        <br />
        To ensure accurate tracking of points towards year-end awards,
        <br />
        please list all combinations that you are aware of currently.
      </h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className='card card-compact bg-base-200'
        >
          <h2 className='card-title ml-3 mt-3'>
            Combination {index + 1}
            <button
              className='btn btn-link text-red-500 btn-xs'
              type='button'
              onClick={() => remove(index)}
            >
              {TrashIcon}
            </button>
          </h2>

          <div className='card-body'>
            <span className='flex gap-5'>
              <TextInput
                label='Rider Name*'
                inputMode='text'
                className='input-sm input-primary'
                error={
                  Array.isArray(errors.riderCombos) &&
                  errors.riderCombos.at(index)
                }
                {...register(`riderCombos.${index}.memberName`, {
                  required: true,
                })}
              />

              <TextInput
                label='Horse Registered Name*'
                inputMode='text'
                className='input-sm input-primary'
                error={
                  Array.isArray(errors.riderCombos) &&
                  errors.riderCombos.at(index)
                }
                {...register(`riderCombos.${index}.horseName`, {
                  required: true,
                })}
              />
            </span>
          </div>
        </div>
      ))}

      <p className='text-error text-xl font-semibold'>
        {errors.riderCombos?.message}
      </p>
      <button
        className='btn btn-secondary btn-xs w-full'
        type='button'
        onClick={() =>
          append({
            division: '',
            memberName: '',
            horseName: '',
          })
        }
      >
        {AddIcon} Add Combo
      </button>
    </section>
  );
}
