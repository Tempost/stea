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
import MemberType from '@/components/forms/MemberType';
import Under18 from '@/components/forms/Under18';
import Checkbox from '@/components/data-entry/Checkbox';
import HorseFieldArray from '@/components/forms/HorseFieldArray';

function IndividualRegistration() {
  const [payment, togglePayment] = useState(false);
  const [isRegHorse, toggleRegHorse] = useState(false);
  const [isUSEAMember, toggleUSEAInput] = useState(false);
  const update = useSetAtom(updateFormState);

  const checkMember = trpc.members.exists.useMutation({
    onSuccess() {
      togglePayment(true);
    },
  });

  const insert = trpc.members.add.useMutation();

  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberFormSchema,
    defaultValues: {
      member: {
        businessName: null,
        useaMemberID: null,
        dateOfBirth: null,
        memberType: 'Individual',
      },
    },
  });

  const { register } = form;

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

  function handleRegHorseCheck() {
    toggleRegHorse(curr => !curr);
  }

  function handleUSEACheck() {
    if (isUSEAMember) {
      form.resetField('member.useaMemberID');
    }

    toggleUSEAInput(curr => {
      return !curr;
    });
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
          mutateFn: () => insert.mutate(form.getValues()),
        }}
      >
        <h2 className='divider'>Individual Membership</h2>

        <div className='flex gap-1 md:gap-5'>
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

        <h3 className='mt-3 pb-2 text-sm'>Address*</h3>
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

          <div className='flex flex-col gap-1 md:flex-row'>
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

          <div className='flex flex-col gap-2'>
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
          </div>

          <div className='container flex-col'>
            <RegType
              register={register('member.memberStatus')}
              formType='Individual'
            />

            <MemberType register={register('member.memberStatusType')} />

            <Under18 dateName='member.dateOfBirth' />
          </div>

          <div className='flex gap-2'>
            <Checkbox
              label='Current USEA Member?'
              checked={isUSEAMember}
              onChange={handleUSEACheck}
            />

            {isUSEAMember && (
              <Input
                type='number'
                className='input-bordered input-primary input w-full md:input-sm'
                placeholder='USEA Member ID'
                {...register('member.useaMemberID', { valueAsNumber: true })}
              />
            )}
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            className='checkbox-primary checkbox md:checkbox-sm'
            checked={isRegHorse}
            onChange={handleRegHorseCheck}
          />

          {isRegHorse && <HorseFieldArray />}
        </div>
      </Payment>
    </Form>
  );
}

IndividualRegistration.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default IndividualRegistration;
