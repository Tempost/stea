import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HorseRegistration from './horseregistration';
import z from 'zod';
import _ from 'lodash';

import { Member } from '@prisma/client';
import { MemberModel } from '@/backend/prisma/zod';
import {
  Radio,
  Checkbox,
  TextInput,
  Select,
  NumericInput,
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

function IndivdualMember() {
  const { register, handleSubmit, formState, watch } =
    useForm<MemberWithTempBool>({
      reValidateMode: 'onSubmit',
      shouldFocusError: true,
      resolver: zodResolver(MemberModel),
      shouldUnregister: true,
    });

  const isUSEAMember = watch('currentUSEAMember', false);
  const isRegHorse = watch('horseReg', false);

  if (!_.isEmpty(formState.errors)) console.log(formState.errors);

  return (
    <form
      className='form-control p-8'
      onSubmit={handleSubmit(console.log)}
    >
      <h2>Indivdual Membership</h2>

      <div className='flex gap-5 w-full'>
        <TextInput
          inputMode='text'
          label='First Name*'
          className='input-sm'
          {...register('firstName', { required: true })}
        />

        <TextInput
          inputMode='text'
          label='Last Name*'
          className='input-sm'
          {...register('lastName', { required: true })}
        />
      </div>

      <h3>Is applicant under 18?</h3>
      <div className='flex gap-2'>
        <Radio
          label='Yes'
          value='JR'
          className='radio radio-primary radio-sm'
          {...register('JRSR', { required: true })}
        />

        <Radio
          label='No'
          value='SR'
          className='radio radio-primary radio-sm'
          {...register('JRSR', { required: true })}
        />
      </div>

      <div className='flex gap-2'>
        <Checkbox
          label='Current USEA Member?'
          className='checkbox checkbox-primary checkbox-sm'
          {...register('currentUSEAMember')}
        />

        {isUSEAMember && (
          <NumericInput
            inputMode='text'
            className='input-sm'
            placeholder='USEA Member ID'
            inputSize='w-50'
            {...register('useaMemberID', {
              required: isUSEAMember,
              valueAsNumber: true,
            })}
          />
        )}
      </div>

      <h3>Address*</h3>
      <div className='flex flex-col gap-2'>
        <TextInput
          inputMode='text'
          className='input-sm'
          placeholder='Address Line 1'
          {...register('address', { required: true })}
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
            {...register('city', { required: true })}
          />

          <Select
            className='select-sm'
            options={states}
            {...register('state', { required: true })}
          />

          <NumericInput
            inputMode='numeric'
            className='input-sm'
            placeholder='Zip Code'
            inputSize='w-fit'
            {...register('zip', { required: true, valueAsNumber: true })}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <Select
              label='Phone Type*'
              className='select-sm'
              options={phoneTypes}
              {...register('phoneType', { required: true })}
            />

            <TextInput
              label='Phone Number*'
              inputMode='tel'
              className='input-sm'
              {...register('phone', { required: true })}
            />
          </div>

          <TextInput
            label='Email'
            inputMode='text'
            className='input-sm'
            placeholder=''
            altLabel='This will the primary method of contact, ensure it is up to date!'
            {...register('email', { required: true })}
          />
        </div>

        <h3>Registration Type*</h3>
        <div className='flex gap-5'>
          <Radio
            label='Annual'
            className='radio radio-primary radio-sm'
            {...register('memberStatus', { required: true })}
          />

          <Radio
            label='Life'
            className='radio radio-primary radio-sm'
            {...register('memberStatus', { required: true })}
          />
        </div>

        <Checkbox
          label='Do you plan to register your horse(s)?'
          className='checkbox checkbox-primary checkbox-sm'
          {...register('horseReg')}
        />

        {isRegHorse && <HorseRegistration />}

        <button
          className='btn btn-primary'
          type='submit'
        >
          Finished
        </button>
      </div>
    </form>
  );
}

export default IndivdualMember;
