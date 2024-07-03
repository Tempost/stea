import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseWhereInputSchema } from '../inputTypeSchemas/HorseWhereInputSchema'
import { HorseOrderByWithAggregationInputSchema } from '../inputTypeSchemas/HorseOrderByWithAggregationInputSchema'
import { HorseScalarFieldEnumSchema } from '../inputTypeSchemas/HorseScalarFieldEnumSchema'
import { HorseScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/HorseScalarWhereWithAggregatesInputSchema'

export const HorseGroupByArgsSchema: z.ZodType<Prisma.HorseGroupByArgs> = z.object({
  where: HorseWhereInputSchema.optional(),
  orderBy: z.union([ HorseOrderByWithAggregationInputSchema.array(),HorseOrderByWithAggregationInputSchema ]).optional(),
  by: HorseScalarFieldEnumSchema.array(),
  having: HorseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default HorseGroupByArgsSchema;
