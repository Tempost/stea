import { useFormContext } from 'react-hook-form';
import { Member } from '@prisma/client';
import HorseCombo from './horseonly';

import {
  Radio,
  TextInput,
  Select,
  NumericInput,
  Checkbox,
} from '@/components/data-entry';
import states from '@/utils/states.json';

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

type MemberWithTempBool = Member & { horseReg: boolean };

function BusinessRegistration() {
  const { register: regBusiness, watch } = useFormContext<MemberWithTempBool>();
  const isRegHorse = watch('horseReg', false);

  return (
    <>
      <h2 className='divider'>Business Registration</h2>
      <div className='flex flex-col gap-2'>
        <h3>Name of Business*</h3>
        <TextInput
          inputMode='text'
          className='input-sm'
          {...regBusiness('businessName', { required: true })}
        />

        <h3>Business Address*</h3>
        <div className='flex flex-col gap-2'>
          <TextInput
            inputMode='text'
            className='input-sm'
            placeholder='Address Line 1'
            {...regBusiness('address', { required: true })}
          />

          <TextInput
            inputMode='text'
            className='input-sm'
            placeholder='Address Line 2'
          />

          <div className='flex gap-1'>
            <TextInput
              inputMode='text'
              className='input-sm'
              placeholder='City'
              {...regBusiness('city', { required: true })}
            />

            <Select
              className='select-sm'
              options={states}
              {...regBusiness('state', { required: true })}
            />

            <NumericInput
              inputMode='numeric'
              className='input-sm'
              placeholder='Zip Code'
              inputSize='w-fit'
              {...regBusiness('zip', { required: true, valueAsNumber: true })}
            />
          </div>
        </div>

        <h3>Contact Person</h3>
        <div>
          <div className='flex gap-5'>
            <TextInput
              inputMode='text'
              label='First Name*'
              className='input-sm'
              {...regBusiness('firstName', { required: true })}
            />

            <TextInput
              inputMode='text'
              label='Last Name*'
              className='input-sm'
              {...regBusiness('lastName', { required: true })}
            />
          </div>
          <div className='flex gap-2'>
            <Select
              label='Phone Type*'
              className='select-sm'
              options={phoneTypes}
              {...regBusiness('phoneType', { required: true })}
            />

            <TextInput
              label='Phone Number*'
              inputMode='tel'
              className='input-sm'
              {...regBusiness('phone', { required: true })}
            />
          </div>

          <TextInput
            label='Email*'
            inputMode='text'
            className='input-sm'
            altLabel={
              'This will the primary method of contact, ensure it is up to date!'
            }
            {...regBusiness('email', { required: true })}
          />

          <h3>Registration Type*</h3>
          <div className='flex gap-5'>
            <Radio
              label='Annual'
              className='radio radio-primary radio-sm'
              {...regBusiness('memberStatus', { required: true })}
            />

            <Radio
              label='Life'
              className='radio radio-primary radio-sm'
              {...regBusiness('memberStatus', { required: true })}
            />
          </div>
        </div>

        <Checkbox
          label='Do you plan to register your horse(s)?'
          className='checkbox checkbox-primary checkbox-sm'
          {...regBusiness('horseReg')}
        />

        {isRegHorse && <HorseCombo />}
      </div>
    </>
  );
}

export default BusinessRegistration;
