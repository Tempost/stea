import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsWhereInputSchema } from '../inputTypeSchemas/PointsWhereInputSchema'
import { PointsOrderByWithRelationInputSchema } from '../inputTypeSchemas/PointsOrderByWithRelationInputSchema'
import { PointsWhereUniqueInputSchema } from '../inputTypeSchemas/PointsWhereUniqueInputSchema'

export const PointsAggregateArgsSchema: z.ZodType<Prisma.PointsAggregateArgs> = z.object({
  where: PointsWhereInputSchema.optional(),
  orderBy: z.union([ PointsOrderByWithRelationInputSchema.array(),PointsOrderByWithRelationInputSchema ]).optional(),
  cursor: PointsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default PointsAggregateArgsSchema;
