import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseScalarWhereInputSchema } from './HorseScalarWhereInputSchema';
import { HorseUpdateManyMutationInputSchema } from './HorseUpdateManyMutationInputSchema';
import { HorseUncheckedUpdateManyWithoutMemberOwnerInputSchema } from './HorseUncheckedUpdateManyWithoutMemberOwnerInputSchema';

export const HorseUpdateManyWithWhereWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseUpdateManyWithWhereWithoutMemberOwnerInput> = z.object({
  where: z.lazy(() => HorseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HorseUpdateManyMutationInputSchema),z.lazy(() => HorseUncheckedUpdateManyWithoutMemberOwnerInputSchema) ]),
}).strict();

export default HorseUpdateManyWithWhereWithoutMemberOwnerInputSchema;
