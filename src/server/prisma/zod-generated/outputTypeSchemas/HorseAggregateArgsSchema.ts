import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseWhereInputSchema } from '../inputTypeSchemas/HorseWhereInputSchema'
import { HorseOrderByWithRelationInputSchema } from '../inputTypeSchemas/HorseOrderByWithRelationInputSchema'
import { HorseWhereUniqueInputSchema } from '../inputTypeSchemas/HorseWhereUniqueInputSchema'

export const HorseAggregateArgsSchema: z.ZodType<Prisma.HorseAggregateArgs> = z.object({
  where: HorseWhereInputSchema.optional(),
  orderBy: z.union([ HorseOrderByWithRelationInputSchema.array(),HorseOrderByWithRelationInputSchema ]).optional(),
  cursor: HorseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default HorseAggregateArgsSchema;
