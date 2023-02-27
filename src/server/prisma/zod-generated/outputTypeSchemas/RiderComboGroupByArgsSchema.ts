import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboWhereInputSchema } from '../inputTypeSchemas/RiderComboWhereInputSchema'
import { RiderComboOrderByWithAggregationInputSchema } from '../inputTypeSchemas/RiderComboOrderByWithAggregationInputSchema'
import { RiderComboScalarFieldEnumSchema } from '../inputTypeSchemas/RiderComboScalarFieldEnumSchema'
import { RiderComboScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/RiderComboScalarWhereWithAggregatesInputSchema'

export const RiderComboGroupByArgsSchema: z.ZodType<Prisma.RiderComboGroupByArgs> = z.object({
  where: RiderComboWhereInputSchema.optional(),
  orderBy: z.union([ RiderComboOrderByWithAggregationInputSchema.array(),RiderComboOrderByWithAggregationInputSchema ]).optional(),
  by: RiderComboScalarFieldEnumSchema.array(),
  having: RiderComboScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default RiderComboGroupByArgsSchema;
