import { HorseForm } from '@/utils/zodschemas';
import { Horse, Status } from '@prisma/client';
import { MyPrismaClient } from '../prisma';

export function groupByFunc<
  RetType extends PropertyKey,
  TObj,
  Func extends (arg: TObj) => RetType
>(arr: Array<TObj>, mapper: Func): Record<RetType, Array<TObj>> {
  return arr.reduce((accumulator, val) => {
    const groupedKey = mapper(val);
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as Record<RetType, Array<TObj>>);
}

// Get Keys and assert correct key types instead of just string
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

export async function checkForExistingMember(
  fullName: string,
  db: MyPrismaClient,
  memberStatus?: Status
) {
  return await db.member.findUnique({
    where: { fullName, memberStatus },
  });
}

export const horseNames = (horses: HorseForm | Array<Horse>) =>
  horses.map(horse => horse.horseRN);

export async function checkExistingHorses(
  horses: HorseForm,
  db: MyPrismaClient,
  regType?: Status
) {
  const matches = await db.horse.findMany({
    where: {
      horseRN: {
        in: horses.map(horse => horse.horseRN),
      },
      regType,
    },
  });

  if (matches.length !== 0) {
    return matches;
  }
}
