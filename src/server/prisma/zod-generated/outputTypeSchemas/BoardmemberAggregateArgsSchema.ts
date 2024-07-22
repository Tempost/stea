import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberWhereInputSchema } from '../inputTypeSchemas/BoardmemberWhereInputSchema'
import { BoardmemberOrderByWithRelationInputSchema } from '../inputTypeSchemas/BoardmemberOrderByWithRelationInputSchema'
import { BoardmemberWhereUniqueInputSchema } from '../inputTypeSchemas/BoardmemberWhereUniqueInputSchema'

export const BoardmemberAggregateArgsSchema: z.ZodType<Prisma.BoardmemberAggregateArgs> = z.object({
  where: BoardmemberWhereInputSchema.optional(),
  orderBy: z.union([ BoardmemberOrderByWithRelationInputSchema.array(),BoardmemberOrderByWithRelationInputSchema ]).optional(),
  cursor: BoardmemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default BoardmemberAggregateArgsSchema;
