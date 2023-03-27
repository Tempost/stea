import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseScalarWhereInputSchema } from './HorseScalarWhereInputSchema';
import { HorseUpdateManyMutationInputSchema } from './HorseUpdateManyMutationInputSchema';
import { HorseUncheckedUpdateManyWithoutHorsesInputSchema } from './HorseUncheckedUpdateManyWithoutHorsesInputSchema';

export const HorseUpdateManyWithWhereWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseUpdateManyWithWhereWithoutOwnerRecInput> = z.object({
  where: z.lazy(() => HorseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HorseUpdateManyMutationInputSchema),z.lazy(() => HorseUncheckedUpdateManyWithoutHorsesInputSchema) ]),
}).strict();

export default HorseUpdateManyWithWhereWithoutOwnerRecInputSchema;
