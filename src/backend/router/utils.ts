import * as trpc from '@trpc/server';
import type { Context } from '@/backend/prisma';
import { Prisma } from '@prisma/client';

export const createRouter = () => {
  return trpc.router<Context>();
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
