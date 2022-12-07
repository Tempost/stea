import * as trpc from '@trpc/server';
import { Prisma } from '@prisma/client';
import { TrpcContext } from '../context';
import { prisma } from '../prisma';

export const createRouter = () => {
  return trpc.router<TrpcContext>();
};

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
  T, // no longer need any requirements on T since the grouper can do w/e it wants
  Func extends (arg: T) => RetType
>(arr: T[], mapper: Func): Record<RetType, T[]> {
  return arr.reduce((accumulator, val) => {
    const groupedKey = mapper(val);
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as Record<RetType, T[]>);
}

// Get Keys and assert correct key types instead of just string
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;
