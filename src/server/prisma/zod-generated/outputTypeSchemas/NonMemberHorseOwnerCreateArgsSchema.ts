import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerIncludeSchema } from '../inputTypeSchemas/NonMemberHorseOwnerIncludeSchema'
import { NonMemberHorseOwnerCreateInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerCreateInputSchema'
import { NonMemberHorseOwnerUncheckedCreateInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerUncheckedCreateInputSchema'
import { HorseFindManyArgsSchema } from "../outputTypeSchemas/HorseFindManyArgsSchema"
import { NonMemberHorseOwnerCountOutputTypeArgsSchema } from "../outputTypeSchemas/NonMemberHorseOwnerCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const NonMemberHorseOwnerSelectSchema: z.ZodType<Prisma.NonMemberHorseOwnerSelect> = z.object({
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  fullName: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  phoneType: z.boolean().optional(),
  horses: z.union([z.boolean(),z.lazy(() => HorseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NonMemberHorseOwnerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NonMemberHorseOwnerCreateArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerCreateArgs> = z.object({
  select: NonMemberHorseOwnerSelectSchema.optional(),
  include: NonMemberHorseOwnerIncludeSchema.optional(),
  data: z.union([ NonMemberHorseOwnerCreateInputSchema,NonMemberHorseOwnerUncheckedCreateInputSchema ]),
}).strict() ;

export default NonMemberHorseOwnerCreateArgsSchema;
