import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseUpdateWithoutOwnerRecInputSchema } from './HorseUpdateWithoutOwnerRecInputSchema';
import { HorseUncheckedUpdateWithoutOwnerRecInputSchema } from './HorseUncheckedUpdateWithoutOwnerRecInputSchema';

export const HorseUpdateWithWhereUniqueWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseUpdateWithWhereUniqueWithoutOwnerRecInput> = z.object({
  where: z.lazy(() => HorseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HorseUpdateWithoutOwnerRecInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutOwnerRecInputSchema) ]),
}).strict();

export default HorseUpdateWithWhereUniqueWithoutOwnerRecInputSchema;
