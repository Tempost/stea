import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseUpdateManyMutationInputSchema } from '../inputTypeSchemas/HorseUpdateManyMutationInputSchema'
import { HorseUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/HorseUncheckedUpdateManyInputSchema'
import { HorseWhereInputSchema } from '../inputTypeSchemas/HorseWhereInputSchema'

export const HorseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HorseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ HorseUpdateManyMutationInputSchema,HorseUncheckedUpdateManyInputSchema ]),
  where: HorseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default HorseUpdateManyAndReturnArgsSchema;
