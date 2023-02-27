import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseScalarWhereInputSchema } from './HorseScalarWhereInputSchema';
import { HorseUpdateManyMutationInputSchema } from './HorseUpdateManyMutationInputSchema';
import { HorseUncheckedUpdateManyWithoutHorsesInputSchema } from './HorseUncheckedUpdateManyWithoutHorsesInputSchema';

export const HorseUpdateManyWithWhereWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseUpdateManyWithWhereWithoutOwnerRecInput> = z.object({
  where: z.lazy(() => HorseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HorseUpdateManyMutationInputSchema),z.lazy(() => HorseUncheckedUpdateManyWithoutHorsesInputSchema) ]),
}).strict();

export default HorseUpdateManyWithWhereWithoutOwnerRecInputSchema;
