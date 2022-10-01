import { ReducerAction } from '@/types/atoms';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MemberFormValues, OwnerHorseFormValues } from './zodschemas';

export default function triggerValidation<
  T extends OwnerHorseFormValues | MemberFormValues
>(
  methods: UseFormReturn<T>,
  toPayment: Dispatch<SetStateAction<boolean>>,
  update: (update: ReducerAction) => void
) {
  const formValues = methods.getValues();
  console.log(formValues);

  methods.trigger().then(valid => {
    if (valid) {
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
      toPayment(true);
    }
  });
}
