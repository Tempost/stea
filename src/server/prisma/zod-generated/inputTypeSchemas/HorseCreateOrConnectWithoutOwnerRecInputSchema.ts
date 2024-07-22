import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseCreateWithoutOwnerRecInputSchema } from './HorseCreateWithoutOwnerRecInputSchema';
import { HorseUncheckedCreateWithoutOwnerRecInputSchema } from './HorseUncheckedCreateWithoutOwnerRecInputSchema';

export const HorseCreateOrConnectWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseCreateOrConnectWithoutOwnerRecInput> = z.object({
  where: z.lazy(() => HorseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HorseCreateWithoutOwnerRecInputSchema),z.lazy(() => HorseUncheckedCreateWithoutOwnerRecInputSchema) ]),
}).strict();

export default HorseCreateOrConnectWithoutOwnerRecInputSchema;
