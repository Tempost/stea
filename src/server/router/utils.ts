import { HorseForm } from '@/utils/zodschemas';
import { Horse, Prisma, Status, Type } from '@prisma/client';
import { MyPrismaClient, prisma } from '../prisma';

export function prepareCombos(
  combos: Prisma.RiderComboCreateManyInput[] | undefined
) {
  if (!combos) {
    return [];
  }

  return combos.map(combo => {
    return { horseName: combo.horseName, division: combo.division };
  });
}

export async function memberExists(fullName: string): Promise<boolean> {
  const memberExists = await prisma.member.findUnique({
    where: { fullName },
  });

  return !!memberExists;
}

export async function horseExists(horseRN: string): Promise<boolean> {
  const horseExists = await prisma.horse.findUnique({
    where: { horseRN },
  });

  return !!horseExists;
}

export function groupBy<TObj>(arr: TObj[], fn: (item: TObj) => any) {
  return arr.reduce<Record<string, TObj[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}

export function groupByFunc<
  RetType extends PropertyKey,
  TObj,
  Func extends (arg: TObj) => RetType
>(arr: TObj[], mapper: Func): Record<RetType, TObj[]> {
  return arr.reduce((accumulator, val) => {
    const groupedKey = mapper(val);
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as Record<RetType, TObj[]>);
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

export const horseNames = (horses: HorseForm | Horse[]) =>
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
