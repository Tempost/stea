import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberWhereInputSchema } from '../inputTypeSchemas/BoardmemberWhereInputSchema'
import { BoardmemberOrderByWithAggregationInputSchema } from '../inputTypeSchemas/BoardmemberOrderByWithAggregationInputSchema'
import { BoardmemberScalarFieldEnumSchema } from '../inputTypeSchemas/BoardmemberScalarFieldEnumSchema'
import { BoardmemberScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/BoardmemberScalarWhereWithAggregatesInputSchema'

export const BoardmemberGroupByArgsSchema: z.ZodType<Prisma.BoardmemberGroupByArgs> = z.object({
  where: BoardmemberWhereInputSchema.optional(),
  orderBy: z.union([ BoardmemberOrderByWithAggregationInputSchema.array(),BoardmemberOrderByWithAggregationInputSchema ]).optional(),
  by: BoardmemberScalarFieldEnumSchema.array(),
  having: BoardmemberScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default BoardmemberGroupByArgsSchema;
