import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseIncludeSchema } from '../inputTypeSchemas/HorseIncludeSchema'
import { HorseWhereInputSchema } from '../inputTypeSchemas/HorseWhereInputSchema'
import { HorseOrderByWithRelationInputSchema } from '../inputTypeSchemas/HorseOrderByWithRelationInputSchema'
import { HorseWhereUniqueInputSchema } from '../inputTypeSchemas/HorseWhereUniqueInputSchema'
import { HorseScalarFieldEnumSchema } from '../inputTypeSchemas/HorseScalarFieldEnumSchema'
import { NonMemberHorseOwnerArgsSchema } from "../outputTypeSchemas/NonMemberHorseOwnerArgsSchema"
import { MemberArgsSchema } from "../outputTypeSchemas/MemberArgsSchema"
import { RiderComboFindManyArgsSchema } from "../outputTypeSchemas/RiderComboFindManyArgsSchema"
import { HorseCountOutputTypeArgsSchema } from "../outputTypeSchemas/HorseCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const HorseSelectSchema: z.ZodType<Prisma.HorseSelect> = z.object({
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  horseRN: z.boolean().optional(),
  horseAKA: z.boolean().optional(),
  memberName: z.boolean().optional(),
  registrationDate: z.boolean().optional(),
  regType: z.boolean().optional(),
  owner: z.boolean().optional(),
  registrationEnd: z.boolean().optional(),
  ownerRec: z.union([z.boolean(),z.lazy(() => NonMemberHorseOwnerArgsSchema)]).optional(),
  memberOwner: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HorseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HorseFindManyArgsSchema: z.ZodType<Prisma.HorseFindManyArgs> = z.object({
  select: HorseSelectSchema.optional(),
  include: HorseIncludeSchema.optional(),
  where: HorseWhereInputSchema.optional(),
  orderBy: z.union([ HorseOrderByWithRelationInputSchema.array(),HorseOrderByWithRelationInputSchema ]).optional(),
  cursor: HorseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HorseScalarFieldEnumSchema,HorseScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default HorseFindManyArgsSchema;
