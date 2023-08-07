import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';
import { HorseUpdateWithoutRiderComboInputSchema } from './HorseUpdateWithoutRiderComboInputSchema';
import { HorseUncheckedUpdateWithoutRiderComboInputSchema } from './HorseUncheckedUpdateWithoutRiderComboInputSchema';

export const HorseUpdateToOneWithWhereWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseUpdateToOneWithWhereWithoutRiderComboInput> = z.object({
  where: z.lazy(() => HorseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => HorseUpdateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutRiderComboInputSchema) ]),
}).strict();

export default HorseUpdateToOneWithWhereWithoutRiderComboInputSchema;
