import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboIncludeSchema } from '../inputTypeSchemas/RiderComboIncludeSchema'
import { RiderComboWhereUniqueInputSchema } from '../inputTypeSchemas/RiderComboWhereUniqueInputSchema'
import { RiderComboCreateInputSchema } from '../inputTypeSchemas/RiderComboCreateInputSchema'
import { RiderComboUncheckedCreateInputSchema } from '../inputTypeSchemas/RiderComboUncheckedCreateInputSchema'
import { RiderComboUpdateInputSchema } from '../inputTypeSchemas/RiderComboUpdateInputSchema'
import { RiderComboUncheckedUpdateInputSchema } from '../inputTypeSchemas/RiderComboUncheckedUpdateInputSchema'
import { MemberArgsSchema } from "../outputTypeSchemas/MemberArgsSchema"
import { HorseArgsSchema } from "../outputTypeSchemas/HorseArgsSchema"
import { PointsFindManyArgsSchema } from "../outputTypeSchemas/PointsFindManyArgsSchema"
import { ShowFindManyArgsSchema } from "../outputTypeSchemas/ShowFindManyArgsSchema"
import { RiderComboCountOutputTypeArgsSchema } from "../outputTypeSchemas/RiderComboCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RiderComboSelectSchema: z.ZodType<Prisma.RiderComboSelect> = z.object({
  uid: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  division: z.boolean().optional(),
  totalPoints: z.boolean().optional(),
  totalShows: z.boolean().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  memberName: z.boolean().optional(),
  horseName: z.boolean().optional(),
  member: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  horse: z.union([z.boolean(),z.lazy(() => HorseArgsSchema)]).optional(),
  points: z.union([z.boolean(),z.lazy(() => PointsFindManyArgsSchema)]).optional(),
  shows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RiderComboCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RiderComboUpsertArgsSchema: z.ZodType<Prisma.RiderComboUpsertArgs> = z.object({
  select: RiderComboSelectSchema.optional(),
  include: RiderComboIncludeSchema.optional(),
  where: RiderComboWhereUniqueInputSchema,
  create: z.union([ RiderComboCreateInputSchema,RiderComboUncheckedCreateInputSchema ]),
  update: z.union([ RiderComboUpdateInputSchema,RiderComboUncheckedUpdateInputSchema ]),
}).strict()

export default RiderComboUpsertArgsSchema;
