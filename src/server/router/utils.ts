import { HorseForm } from '@/utils/zodschemas';
import { Horse } from '@prisma/client';

export function groupByFunc<
  RetType extends PropertyKey,
  TObj,
  Func extends (arg: TObj) => RetType,
>(arr: Array<TObj>, mapper: Func): Record<RetType, Array<TObj>> {
  return arr.reduce(
    (accumulator, val) => {
      const groupedKey = mapper(val);
      if (!accumulator[groupedKey]) {
        accumulator[groupedKey] = [];
      }
      accumulator[groupedKey].push(val);
      return accumulator;
    },
    {} as Record<RetType, Array<TObj>>,
  );
}

// Get Keys and assert correct key types instead of just string
export const getKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;

export const horseNames = (horses: HorseForm | Array<Horse>) =>
  horses.map(horse => horse.horseRN);

export function setMembershipYear() {
  const currDate = new Date();
  const endDate = new Date(currDate.getFullYear(), 10, 30);

  // If the current month is decemeber
  if (currDate.getMonth() == 11) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  console.log(endDate);
  return endDate;
}
