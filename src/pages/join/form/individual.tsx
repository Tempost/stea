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
import RegistrationYearSelect from '@/components/forms/RegistrationYearSelect';

function IndividualRegistration() {
  const [payment, togglePayment] = useState(false);
  const [isRegHorse, toggleRegHorse] = useState(false);
  const update = useSetAtom(updateFormState);

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
      memberInput: {
        businessName: null,
        dateOfBirth: null,
        memberType: 'Individual',
        membershipEnd: null,
      },
    },
  });

  const { register, control } = form;

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
        <h2 className='divider'>Individual Membership</h2>

        <div className='flex gap-1 md:gap-5'>
          <Input
            type='text'
            label='First Name*'
            className='input input-bordered input-primary w-full md:input-sm'
            {...register('memberInput.firstName')}
          />

          <Input
            type='text'
            label='Last Name*'
            className='input input-bordered input-primary w-full md:input-sm'
            {...register('memberInput.lastName')}
          />
        </div>

        <h3 className='mt-3 pb-2 text-sm'>Address*</h3>
        <div className='flex flex-col gap-2'>
          <Input
            type='text'
            className='input input-bordered input-primary w-full md:input-sm'
            placeholder='Address Line 1'
            {...register('memberInput.address')}
          />

          <Input
            type='text'
            className='input input-bordered input-primary w-full md:input-sm'
            placeholder='Address Line 2'
            name='temp'
          />

          <div className='flex flex-col gap-1 md:flex-row'>
            <Input
              type='text'
              className='input input-bordered input-primary w-full md:input-sm'
              placeholder='City'
              {...register('memberInput.city')}
            />

            <Select
              className='select select-bordered select-primary w-full md:select-sm'
              {...register('memberInput.state')}
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
              className='input input-bordered input-primary w-full md:input-sm'
              placeholder='Zip Code'
              {...register('memberInput.zip', { valueAsNumber: true })}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Select
                label='Phone Type*'
                className='select select-bordered select-primary md:select-sm'
                {...register('memberInput.phoneType')}
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
                className='input input-bordered input-primary w-full md:input-sm'
                {...register('memberInput.phone')}
              />
            </div>

            <Input
              label='Email*'
              type='text'
              className='input input-bordered input-primary w-full md:input-sm'
              altLabel={'This will be the primary method of contact.'}
              {...register('memberInput.email')}
            />
          </div>

          <div className='container flex-col'>
            <RegType
              register={register('memberInput.memberStatus')}
              formType='Individual'
            />

            <RegistrationYearSelect
              heading='Which year are you registering for?'
              watchFieldName='memberInput.memberStatus'
              control={control}
              register={register('memberInput.membershipEnd')}
            />

            <MemberType register={register('memberInput.memberStatusType')} />

            <Under18 dateName='memberInput.dateOfBirth' />
          </div>

          <Checkbox
            label='Do you plan to register your horse(s)?'
            className='checkbox checkbox-primary md:checkbox-sm'
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
