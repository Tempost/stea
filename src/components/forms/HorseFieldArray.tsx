import { useFieldArray, useFormContext } from 'react-hook-form';
import { Prisma, Status } from '@prisma/client';
import RegistrationSelect from './RegType';
import { AddIcon, TrashIcon } from '../icons';
import Input from '../data-entry/Input';
import RegistrationYearSelect from './RegistrationYearSelect';
import { setMembershipYear } from '@/server/router/utils';
import { Button } from '../styled-ui/Button';

type Horses = {
  horses: Array<Prisma.HorseCreateManyInput>;
};

export default function HorseFieldArray() {
  const {
    register,
    control,
    setValue,
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
            <RegistrationSelect
              register={register(`horses.${index}.regType` as const, {
                required: true,
              })}
              formType='horse'
              onClick={event => {
                if (event.currentTarget.value === null) {
                  setValue(`horses.${index}.registrationEnd`, null);
                } else {
                  setValue(
                    `horses.${index}.registrationEnd`,
                    setMembershipYear(),
                  );
                }
              }}
            />

            <RegistrationYearSelect
              heading='Which year is the registration for?'
              watchFieldName={`horses.${index}.regType` as const}
              control={control}
              register={register(`horses.${index}.registrationEnd` as const)}
            />

            <div className='flex flex-col gap-2'>
              <Input
                label='Registered Name*'
                type='text'
                altLabel='Registered name must be used when entering a show.'
                {...register(`horses.${index}.horseRN` as const)}
              />

              <Input
                label='Barn Name'
                type='text'
                {...register(`horses.${index}.horseAKA` as const)}
              />
            </div>
          </div>
        </div>
      ))}

      <p className='text-xl font-semibold text-error'>
        {errors.horses?.message}
      </p>
      <Button
        className='btn-secondary btn-xs mb-5'
        onClick={() =>
          append({
            horseRN: '',
            horseAKA: '',
            regType: 'Annual' as Status,
            registrationEnd: setMembershipYear(),
          })
        }
      >
        {AddIcon} Add Horse
      </Button>
    </section>
  );
}
