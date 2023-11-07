import { useSetAtom } from 'jotai';
import { ReactElement, useState } from 'react';

import { FormLayout } from '@/components/layout/FormLayout';
import { MemberForm, MemberFormSchema } from '@/utils/zodschemas';
import { updateFormState } from '@/utils/atoms';
import { capitalize } from '@/utils/helpers';
import states from '@/utils/states.json';
import { trpc } from '@/utils/trpc';
import useZodForm from '@/utils/usezodform';
import Form from '@/components/forms/Form';
import { PhoneTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/PhoneTypeSchema';
import Payment from '@/components/forms/Payment';
import Input from '@/components/data-entry/Input';
import Select from '@/components/data-entry/Select';
import RegType from '@/components/forms/RegType';
import Checkbox from '@/components/data-entry/Checkbox';
import HorseFieldArray from '@/components/forms/HorseFieldArray';

function BusinessRegistration() {
  const [payment, togglePayment] = useState(false);
  const [isRegHorse, toggleRegHorse] = useState(false);

  const checkMember = trpc.members.exists.useMutation({
    onSuccess() {
      togglePayment(true);
    },
  });

  const add = trpc.members.add.useMutation();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormSchema,
    defaultValues: {
      member: {
        useaMemberID: null,
        dateOfBirth: null,
        memberType: 'Business',
        memberStatusType: 'Professional',
      },
    },
  });

  const { register } = form;

  const update = useSetAtom(updateFormState);

  function onSubmit(formValues: MemberForm) {
    if (formValues.horses) {
      const lifeCount = formValues.horses.filter(
        horse => horse.regType === 'Life'
      ).length;

      const annualCount = formValues.horses.filter(
        horse => horse.regType === 'Annual'
      ).length;

      update({
        type: 'HORSE',
        payload: { lifeCount: lifeCount, annualCount: annualCount },
      });
    }

    checkMember.mutate(formValues);
  }

  function handleCheck(e: any) {
    e.preventDefault;
    toggleRegHorse(curr => !curr);
  }

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
    >
      <Payment
        showPayment={payment}
        formMutation={{
          error: checkMember.isError,
          message: checkMember.error?.message,
          mutateFn: () => add.mutate(form.getValues()),
        }}
      >
        <h2 className='divider'>Business Registration</h2>

        <h3 className='mb-2 rounded-2xl border border-solid border-gray-400 bg-gray-100 p-4 text-center'>
          As part of the membership you can submit
          <br />
          your company logo for our home page!
          <br />
          Submit to stea@stevening.net
        </h3>

        <div className='flex flex-col gap-2'>
          <h3 className='text-sm'>Name of Business*</h3>
          <Input
            type='text'
            className='input-bordered input-primary input w-full md:input-sm'
            {...register('member.businessName')}
          />

          <h3 className='text-sm'>Business Address*</h3>
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              className='input-bordered input-primary input w-full md:input-sm'
              placeholder='Address Line 1'
              {...register('member.address')}
            />

            <Input
              type='text'
              className='input-bordered input-primary input w-full md:input-sm'
              placeholder='Address Line 2'
              name='temp'
            />

            <div className='flex gap-1'>
              <Input
                type='text'
                className='input-bordered input-primary input w-full md:input-sm'
                placeholder='City'
                {...register('member.city')}
              />

              <Select
                className='select-bordered select-primary select w-full md:select-sm'
                {...register('member.state')}
              >
                {states.map(state => (
                  <option
                    key={state.value}
                    value={state.value}
                  >
                    {capitalize(state.label)}
                  </option>
                ))}
              </Select>

              <Input
                type='numeric'
                className='input-bordered input-primary input w-full md:input-sm'
                placeholder='Zip Code'
                {...register('member.zip', { valueAsNumber: true })}
              />
            </div>
          </div>

          <h3 className='mt-3 font-semibold'>Point of Contact</h3>
          <div>
            <div className='flex gap-5'>
              <Input
                type='text'
                label='First Name*'
                className='input-bordered input-primary input w-full md:input-sm'
                {...register('member.firstName')}
              />

              <Input
                type='text'
                label='Last Name*'
                className='input-bordered input-primary input w-full md:input-sm'
                {...register('member.lastName')}
              />
            </div>
            <div className='flex gap-2'>
              <Select
                label='Phone Type*'
                className='select-bordered select-primary select md:select-sm'
                {...register('member.phoneType')}
              >
                {Object.keys(PhoneTypeSchema.enum).map(type => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </Select>

              <Input
                label='Phone Number*'
                type='tel'
                className='input-bordered input-primary input w-full md:input-sm'
                {...register('member.phone')}
              />
            </div>

            <Input
              label='Email*'
              type='text'
              className='input-bordered input-primary input w-full md:input-sm'
              altLabel={'This will be the primary method of contact.'}
              {...register('member.email')}
            />

            <RegType
              register={register('member.memberStatus')}
              formType='Business'
            />
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            className='checkbox-primary checkbox md:checkbox-sm'
            checked={isRegHorse}
            onChange={handleCheck}
          />

          {isRegHorse && <HorseFieldArray />}
        </div>
      </Payment>
    </Form>
  );
}

BusinessRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default BusinessRegistration;
