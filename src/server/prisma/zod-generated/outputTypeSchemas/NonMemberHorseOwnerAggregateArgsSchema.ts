import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerWhereInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerWhereInputSchema'
import { NonMemberHorseOwnerOrderByWithRelationInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerOrderByWithRelationInputSchema'
import { NonMemberHorseOwnerWhereUniqueInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerWhereUniqueInputSchema'

export const NonMemberHorseOwnerAggregateArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerAggregateArgs> = z.object({
  where: NonMemberHorseOwnerWhereInputSchema.optional(),
  orderBy: z.union([ NonMemberHorseOwnerOrderByWithRelationInputSchema.array(),NonMemberHorseOwnerOrderByWithRelationInputSchema ]).optional(),
  cursor: NonMemberHorseOwnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default NonMemberHorseOwnerAggregateArgsSchema;
