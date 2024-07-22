import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsIncludeSchema } from '../inputTypeSchemas/PointsIncludeSchema'
import { PointsWhereUniqueInputSchema } from '../inputTypeSchemas/PointsWhereUniqueInputSchema'
import { PointsCreateInputSchema } from '../inputTypeSchemas/PointsCreateInputSchema'
import { PointsUncheckedCreateInputSchema } from '../inputTypeSchemas/PointsUncheckedCreateInputSchema'
import { PointsUpdateInputSchema } from '../inputTypeSchemas/PointsUpdateInputSchema'
import { PointsUncheckedUpdateInputSchema } from '../inputTypeSchemas/PointsUncheckedUpdateInputSchema'
import { RiderComboArgsSchema } from "../outputTypeSchemas/RiderComboArgsSchema"
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PointsSelectSchema: z.ZodType<Prisma.PointsSelect> = z.object({
  uid: z.boolean().optional(),
  riderUid: z.boolean().optional(),
  points: z.boolean().optional(),
  place: z.boolean().optional(),
  showUid: z.boolean().optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
}).strict()

export const PointsUpsertArgsSchema: z.ZodType<Prisma.PointsUpsertArgs> = z.object({
  select: PointsSelectSchema.optional(),
  include: PointsIncludeSchema.optional(),
  where: PointsWhereUniqueInputSchema,
  create: z.union([ PointsCreateInputSchema,PointsUncheckedCreateInputSchema ]),
  update: z.union([ PointsUpdateInputSchema,PointsUncheckedUpdateInputSchema ]),
}).strict() ;

export default PointsUpsertArgsSchema;
