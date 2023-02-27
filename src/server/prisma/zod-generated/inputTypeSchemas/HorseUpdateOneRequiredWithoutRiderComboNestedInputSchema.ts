import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseCreateWithoutRiderComboInputSchema } from './HorseCreateWithoutRiderComboInputSchema';
import { HorseUncheckedCreateWithoutRiderComboInputSchema } from './HorseUncheckedCreateWithoutRiderComboInputSchema';
import { HorseCreateOrConnectWithoutRiderComboInputSchema } from './HorseCreateOrConnectWithoutRiderComboInputSchema';
import { HorseUpsertWithoutRiderComboInputSchema } from './HorseUpsertWithoutRiderComboInputSchema';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseUpdateWithoutRiderComboInputSchema } from './HorseUpdateWithoutRiderComboInputSchema';
import { HorseUncheckedUpdateWithoutRiderComboInputSchema } from './HorseUncheckedUpdateWithoutRiderComboInputSchema';

export const HorseUpdateOneRequiredWithoutRiderComboNestedInputSchema: z.ZodType<Prisma.HorseUpdateOneRequiredWithoutRiderComboNestedInput> = z.object({
  create: z.union([ z.lazy(() => HorseCreateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedCreateWithoutRiderComboInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HorseCreateOrConnectWithoutRiderComboInputSchema).optional(),
  upsert: z.lazy(() => HorseUpsertWithoutRiderComboInputSchema).optional(),
  connect: z.lazy(() => HorseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HorseUpdateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutRiderComboInputSchema) ]).optional(),
}).strict();

export default HorseUpdateOneRequiredWithoutRiderComboNestedInputSchema;
