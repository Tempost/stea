import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { NonMemberHorseOwnerWhereInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerWhereInputSchema'
import { NonMemberHorseOwnerOrderByWithAggregationInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerOrderByWithAggregationInputSchema'
import { NonMemberHorseOwnerScalarFieldEnumSchema } from '../inputTypeSchemas/NonMemberHorseOwnerScalarFieldEnumSchema'
import { NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema'

export const NonMemberHorseOwnerGroupByArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerGroupByArgs> = z.object({
  where: NonMemberHorseOwnerWhereInputSchema.optional(),
  orderBy: z.union([ NonMemberHorseOwnerOrderByWithAggregationInputSchema.array(),NonMemberHorseOwnerOrderByWithAggregationInputSchema ]).optional(),
  by: NonMemberHorseOwnerScalarFieldEnumSchema.array(),
  having: NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default NonMemberHorseOwnerGroupByArgsSchema;
