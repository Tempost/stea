import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboWhereInputSchema } from '../inputTypeSchemas/RiderComboWhereInputSchema'
import { RiderComboOrderByWithRelationInputSchema } from '../inputTypeSchemas/RiderComboOrderByWithRelationInputSchema'
import { RiderComboWhereUniqueInputSchema } from '../inputTypeSchemas/RiderComboWhereUniqueInputSchema'

export const RiderComboAggregateArgsSchema: z.ZodType<Prisma.RiderComboAggregateArgs> = z.object({
  where: RiderComboWhereInputSchema.optional(),
  orderBy: z.union([ RiderComboOrderByWithRelationInputSchema.array(),RiderComboOrderByWithRelationInputSchema ]).optional(),
  cursor: RiderComboWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default RiderComboAggregateArgsSchema;
