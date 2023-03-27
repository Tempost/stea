import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseUpdateWithoutRiderComboInputSchema } from './HorseUpdateWithoutRiderComboInputSchema';
import { HorseUncheckedUpdateWithoutRiderComboInputSchema } from './HorseUncheckedUpdateWithoutRiderComboInputSchema';
import { HorseCreateWithoutRiderComboInputSchema } from './HorseCreateWithoutRiderComboInputSchema';
import { HorseUncheckedCreateWithoutRiderComboInputSchema } from './HorseUncheckedCreateWithoutRiderComboInputSchema';

export const HorseUpsertWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseUpsertWithoutRiderComboInput> = z.object({
  update: z.union([ z.lazy(() => HorseUpdateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutRiderComboInputSchema) ]),
  create: z.union([ z.lazy(() => HorseCreateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedCreateWithoutRiderComboInputSchema) ]),
}).strict();

export default HorseUpsertWithoutRiderComboInputSchema;
