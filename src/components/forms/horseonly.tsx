import { useFormContext } from 'react-hook-form';

import { TextInput, Select } from '@/components/data-entry';
import { HorseFieldArray, RiderComboFieldArray } from './fieldarrayfields';

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

function HorseRegistration() {
  const { register } = useFormContext();

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
            {...register('owner.firstName', { required: true })}
          />

          <TextInput
            inputMode='text'
            label='Last Name*'
            className='input-sm'
            {...register('owner.lastName', { required: true })}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <TextInput
            label='Email'
            inputMode='text'
            className='input-sm'
            altLabel='This will the primary method of contact, ensure it is up to date!'
            {...register('owner.email', { required: true })}
          />

          <div className='flex gap-2'>
            <Select
              label='Phone Type*'
              className='select-sm'
              options={phoneTypes}
              {...register('owner.phoneType', { required: true })}
            />

            <TextInput
              label='Phone Number*'
              inputMode='tel'
              className='input-sm'
              {...register('owner.phone', { required: true })}
            />
          </div>
        </div>
        <HorseFieldArray />
        <RiderComboFieldArray />
      </div>
    </>
  );
}

export default HorseRegistration;
