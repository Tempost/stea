import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseUpdateWithoutRiderComboInputSchema } from './HorseUpdateWithoutRiderComboInputSchema';
import { HorseUncheckedUpdateWithoutRiderComboInputSchema } from './HorseUncheckedUpdateWithoutRiderComboInputSchema';
import { HorseCreateWithoutRiderComboInputSchema } from './HorseCreateWithoutRiderComboInputSchema';
import { HorseUncheckedCreateWithoutRiderComboInputSchema } from './HorseUncheckedCreateWithoutRiderComboInputSchema';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';

export const HorseUpsertWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseUpsertWithoutRiderComboInput> = z.object({
  update: z.union([ z.lazy(() => HorseUpdateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutRiderComboInputSchema) ]),
  create: z.union([ z.lazy(() => HorseCreateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedCreateWithoutRiderComboInputSchema) ]),
  where: z.lazy(() => HorseWhereInputSchema).optional()
}).strict();

export default HorseUpsertWithoutRiderComboInputSchema;
