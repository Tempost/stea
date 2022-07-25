import { useFieldArray, useFormContext } from 'react-hook-form';

import { Radio, TextInput, Select } from '@/components/data-entry';
import { Horse, RiderCombo } from '@prisma/client';

const phoneTypes = [
  {
    label: 'mobile',
    value: 'Mobile',
  },
  {
    label: 'home',
    value: 'Home',
  },
  {
    label: 'business',
    value: 'Business',
  },
];

const AddIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
    />
  </svg>
);

const TrashIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    />
  </svg>
);

type Horses = {
  horses: Horse[]
};

type RiderCombos = {
  riderCombos: RiderCombo[]
};

function HorseRegistration() {
  const { register: regHorse, control: controlHorse } = useFormContext<Horses>();
  const { register: regOwner } = useFormContext();
  const { register: regCombo, control: controlCombo } = useFormContext();

  const {
    fields: horseFields,
    append: appendHorse,
    remove: removeHorse,
  } = useFieldArray<Horses>({
    control: controlHorse,
    name: 'horses'
  });

  const {
    fields: comboFields,
    append: appendCombo,
    remove: removeCombo,
  } = useFieldArray({
    control: controlCombo,
    name: 'riderCombos',
  });

  return (
    <>
      <h2 className='divider'>Horse Registration</h2>
      <div className='flex flex-col gap-2'>
        <h3>Owner Information</h3>

        <div className='flex gap-5'>
          <TextInput
            inputMode='text'
            label='First Name*'
            className='input-sm'
            {...regOwner('owner.firstName', { required: true })}
          />

          <TextInput
            inputMode='text'
            label='Last Name*'
            className='input-sm'
            {...regOwner('owner.lastName', { required: true })}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <TextInput
            label='Email'
            inputMode='text'
            className='input-sm'
            altLabel='This will the primary method of contact, ensure it is up to date!'
            {...regOwner('owner.email', { required: true })}
          />

          <div className='flex gap-2'>
            <Select
              label='Phone Type*'
              className='select-sm'
              options={phoneTypes}
              {...regOwner('owner.phoneType', { required: true })}
            />

            <TextInput
              label='Phone Number*'
              inputMode='tel'
              className='input-sm'
              {...regOwner('owner.phone', { required: true })}
            />
          </div>
        </div>

        <h2 className='text-sm font-bold'>
          List the horses you are registering.
          <br />
          Note that the horse’s registered name MUST be used when entering a
          STEA show.
        </h2>

        {horseFields.map((field, index) => (
          <div
            key={field.id}
            className='card card-compact bg-base-200'
          >
            <h2 className='card-title ml-3 mt-3'>
              Horse {index + 1}
              <button
                className='btn btn-link text-red-500 btn-xs'
                onClick={() => removeHorse(index)}
              >
                {TrashIcon}
              </button>
            </h2>

            <div className='card-body'>
              <h3>Registration Type*</h3>

              <div className='flex gap-5'>
                <Radio
                  label='Annual'
                  className='radio radio-secondary radio-sm'
                  value='Annual'
                  {...regHorse(`horses.${index}.regType` as const, { required: true })}
                />

                <Radio
                  label='Life'
                  className='radio radio-secondary radio-sm'
                  value='Life'
                  {...regHorse(`horses.${index}.regType` as const, { required: true })}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <TextInput
                  label='Registered Name*'
                  inputMode='text'
                  className='input-sm'
                  {...regHorse(`horses.${index}.horseRN` as const, { required: true })}
                />

                <TextInput
                  label='Aka Name'
                  inputMode='text'
                  className='input-sm'
                  {...regHorse(`horses.${index}.horseAKA` as const, { required: true })}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          className='btn btn-outline btn-xs'
          onClick={() =>
            appendHorse({ regType: undefined, horseAKA: '', horseRN: '' })
          }
        >
          {AddIcon} Add Horse
        </button>

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

        {comboFields.map((field, index) => (
          <div
            key={field.id}
            className='card card-compact bg-base-200'
          >
            <h2 className='card-title ml-3 mt-3'>
              Combination {index + 1}
              <button
                className='btn btn-link text-red-500 btn-xs'
                onClick={() => removeCombo(index)}
              >
                {TrashIcon}
              </button>
            </h2>

            <div className='card-body'>
              <div className='flex gap-5'>
                <TextInput
                  label='Rider Name*'
                  inputMode='text'
                  className='input-sm'
                  {...regCombo(`riderCombos.${index}.memberName`, { required: true })}
                />
                <TextInput
                  label='Horse Registered Name*'
                  inputMode='text'
                  className='input-sm'
                  {...regCombo(`riderCombos.${index}.horseName`, { required: true })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className='btn btn-outline btn-xs'
        onClick={() => appendCombo({ memberName: '', horseName: '' })}
      >
        {AddIcon} Add Combo
      </button>
    </>
  );
}

export default HorseRegistration;
