import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseCreateWithoutRiderComboInputSchema } from './HorseCreateWithoutRiderComboInputSchema';
import { HorseUncheckedCreateWithoutRiderComboInputSchema } from './HorseUncheckedCreateWithoutRiderComboInputSchema';

export const HorseCreateOrConnectWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseCreateOrConnectWithoutRiderComboInput> = z.object({
  where: z.lazy(() => HorseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HorseCreateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedCreateWithoutRiderComboInputSchema) ]),
}).strict();

export default HorseCreateOrConnectWithoutRiderComboInputSchema;
