import { useFieldArray, useFormContext } from 'react-hook-form';
import { Prisma, Status } from '@prisma/client';
import RegistrationSelect from './RegType';
import { AddIcon, TrashIcon } from '../icons';
import RegistrationYearSelect from './RegistrationYearSelect';
import { setMembershipYear } from '@/utils/setmembershipyear';
import { Button } from '../styled-ui/Button';
import Form from '@/components/form/Form';

const { Input } = Form;

type Horses = {
  horses: Array<Prisma.HorseCreateManyInput>;
};

export default function HorseFieldArray() {
  const { register, control, setValue } = useFormContext<Horses>();

  const { fields, append, remove } = useFieldArray<Horses>({
    control,
    name: 'horses',
  });

  return (
    <div className='bg-base-200 rounded-lg border border-gray-200 shadow-xs'>
      <div className='p-2'>
        <fieldset
          id='horse-info'
          className='space-y-2'
        >
          <legend className='fieldset-legend text-sm font-bold'>
            List the horses you are registering.
            <br />
            Note: Horse’s registered name MUST match when entering a show.
          </legend>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className='bg-base-300 rounded-lg border border-gray-200 p-2 shadow-xs'
            >
              <h2>
                Horse {index + 1}
                <Button
                  className='text-red-500'
                  variant='link'
                  size='xs'
                  onClick={() => remove(index)}
                >
                  {TrashIcon}
                </Button>
              </h2>

              <div className='space-y-5'>
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
                  price
                />

                <RegistrationYearSelect
                  heading='Which year is the registration for?'
                  watchFieldName={`horses.${index}.regType` as const}
                  control={control}
                  register={register(
                    `horses.${index}.registrationEnd` as const,
                  )}
                />

                <div className='flex flex-col gap-2'>
                  <Input
                    label='Registered Name*'
                    {...register(`horses.${index}.horseRN` as const)}
                  />

                  <Input
                    label='Barn Name'
                    {...register(`horses.${index}.horseAKA` as const)}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            className='w-full'
            variant='secondary'
            size='xs'
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
        </fieldset>
      </div>
    </div>
  );
}
