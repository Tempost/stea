import * as trpc from '@trpc/server';
import { Prisma } from '@prisma/client';
import { TrpcContext } from '../context';

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
