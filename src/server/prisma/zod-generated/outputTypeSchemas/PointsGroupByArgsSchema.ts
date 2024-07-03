import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsWhereInputSchema } from '../inputTypeSchemas/PointsWhereInputSchema'
import { PointsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/PointsOrderByWithAggregationInputSchema'
import { PointsScalarFieldEnumSchema } from '../inputTypeSchemas/PointsScalarFieldEnumSchema'
import { PointsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/PointsScalarWhereWithAggregatesInputSchema'

export const PointsGroupByArgsSchema: z.ZodType<Prisma.PointsGroupByArgs> = z.object({
  where: PointsWhereInputSchema.optional(),
  orderBy: z.union([ PointsOrderByWithAggregationInputSchema.array(),PointsOrderByWithAggregationInputSchema ]).optional(),
  by: PointsScalarFieldEnumSchema.array(),
  having: PointsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default PointsGroupByArgsSchema;
