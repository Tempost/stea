import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseUpdateManyMutationInputSchema } from '../inputTypeSchemas/HorseUpdateManyMutationInputSchema'
import { HorseUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/HorseUncheckedUpdateManyInputSchema'
import { HorseWhereInputSchema } from '../inputTypeSchemas/HorseWhereInputSchema'

export const HorseUpdateManyArgsSchema: z.ZodType<Prisma.HorseUpdateManyArgs> = z.object({
  data: z.union([ HorseUpdateManyMutationInputSchema,HorseUncheckedUpdateManyInputSchema ]),
  where: HorseWhereInputSchema.optional(),
}).strict() ;

export default HorseUpdateManyArgsSchema;
