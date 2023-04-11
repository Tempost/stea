import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseIncludeSchema } from '../inputTypeSchemas/HorseIncludeSchema'
import { HorseUpdateInputSchema } from '../inputTypeSchemas/HorseUpdateInputSchema'
import { HorseUncheckedUpdateInputSchema } from '../inputTypeSchemas/HorseUncheckedUpdateInputSchema'
import { HorseWhereUniqueInputSchema } from '../inputTypeSchemas/HorseWhereUniqueInputSchema'
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
  ownerRec: z.union([z.boolean(),z.lazy(() => NonMemberHorseOwnerArgsSchema)]).optional(),
  memberOwner: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  memberName: z.boolean().optional(),
  registrationDate: z.boolean().optional(),
  regType: z.boolean().optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  owner: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => HorseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HorseUpdateArgsSchema: z.ZodType<Prisma.HorseUpdateArgs> = z.object({
  select: HorseSelectSchema.optional(),
  include: HorseIncludeSchema.optional(),
  data: z.union([ HorseUpdateInputSchema,HorseUncheckedUpdateInputSchema ]),
  where: HorseWhereUniqueInputSchema,
}).strict()

export default HorseUpdateArgsSchema;
