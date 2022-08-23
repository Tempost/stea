import { FieldValues, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import {
  Radio,
  TextInput,
  Select,
  NumericInput,
  Checkbox,
} from '@/components/data-entry';
import states from '@/utils/states.json';
import useZodForm from '@/utils/usezodform';
import { HorseModel, MemberModel } from '@/backend/prisma/zod';
import { HorseFieldArray, RiderComboFieldArray } from './fieldarrayfields';
import RegType from './regtype';

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

const MemberFormValues = z.object({
  member: MemberModel.omit({ fullName: true }),
  horseReg: z.boolean(),
  horses: z.array(HorseModel).optional(),
});

function BusinessRegistration() {
  const methods = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
    schema: MemberFormValues,
  });
  const { register, watch, handleSubmit, formState: { errors } } = methods;

  const isRegHorse = watch('horseReg', false);

  function onSumbit(formValues: FieldValues) {
    formValues.member.fullName = `${formValues.member.firstName} ${formValues.member.lastName}`;

    // memberMutation.mutate({
    //   member: formValues.member,
    //   horses: formValues.horses,
    // });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <h2 className='divider'>Business Registration</h2>

        <h3 className='text-center m-2'>
          As part of the membership you can submit
          <br />
          your company logo on our home page!
        </h3>

        <div className='flex flex-col gap-2'>
          <h3>Name of Business*</h3>
          <TextInput
            inputMode='text'
            className='input-sm input-primary'
            error={errors.member?.businessName}
            {...register('member.businessName', { required: true })}
          />

          <h3>Business Address*</h3>
          <div className='flex flex-col gap-2'>
            <TextInput
              inputMode='text'
              className='input-sm input-primary'
              placeholder='Address Line 1'
              error={errors.member?.address}
              {...register('member.address', { required: true })}
            />

            <TextInput
              inputMode='text'
              className='input-sm input-primary'
              placeholder='Address Line 2'
              name='temp'
            />

            <div className='flex gap-1'>
              <TextInput
                inputMode='text'
                className='input-sm input-primary'
                placeholder='City'
                error={errors.member?.city}
                {...register('member.city', { required: true })}
              />

              <Select
                className='select-sm select-primary'
                options={states}
                error={errors.member?.state}
                {...register('member.state', { required: true })}
              />

              <NumericInput
                inputMode='numeric'
                className='input-sm input-primary'
                placeholder='Zip Code'
                inputSize='w-fit'
                error={errors.member?.zip}
                {...register('member.zip', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <h3>Contact Person</h3>
          <div>
            <div className='flex gap-5'>
              <TextInput
                inputMode='text'
                label='First Name*'
                className='input-sm input-primary'
                error={errors.member?.firstName}
                {...register('member.firstName', { required: true })}
              />

              <TextInput
                inputMode='text'
                label='Last Name*'
                className='input-sm input-primary'
                error={errors.member?.lastName}
                {...register('member.lastName', { required: true })}
              />
            </div>
            <div className='flex gap-2'>
              <Select
                label='Phone Type*'
                className='select-sm select-primary'
                options={phoneTypes}
                {...register('member.phoneType', { required: true })}
              />

              <TextInput
                label='Phone Number*'
                inputMode='tel'
                className='input-sm input-primary'
                error={errors.member?.phone}
                {...register('member.phone', { required: true })}
              />
            </div>

            <TextInput
              label='Email*'
              inputMode='text'
              className='input-sm input-primary'
              error={errors.member?.email}
              altLabel={
                'This will the primary method of contact, ensure it is up to date!'
              }
              {...register('member.email', { required: true })}
            />

            <RegType
              register={register('member.memberStatus', { required: true })}
            />
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            className='checkbox checkbox-primary checkbox-sm'
            {...register('horseReg')}
          />

          {isRegHorse && <HorseFieldArray />}
          {isRegHorse && <RiderComboFieldArray />}
        </div>
        <button
          className='btn btn-primary mt-8 w-full'
          type='submit'
        >
          Finished
        </button>
      </form>
    </FormProvider>
  );
}

export default BusinessRegistration;
