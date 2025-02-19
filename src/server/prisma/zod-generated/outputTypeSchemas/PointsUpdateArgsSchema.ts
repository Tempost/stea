import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsIncludeSchema } from '../inputTypeSchemas/PointsIncludeSchema'
import { PointsUpdateInputSchema } from '../inputTypeSchemas/PointsUpdateInputSchema'
import { PointsUncheckedUpdateInputSchema } from '../inputTypeSchemas/PointsUncheckedUpdateInputSchema'
import { PointsWhereUniqueInputSchema } from '../inputTypeSchemas/PointsWhereUniqueInputSchema'
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

export const PointsUpdateArgsSchema: z.ZodType<Prisma.PointsUpdateArgs> = z.object({
  select: PointsSelectSchema.optional(),
  include: z.lazy(() => PointsIncludeSchema).optional(),
  data: z.union([ PointsUpdateInputSchema,PointsUncheckedUpdateInputSchema ]),
  where: PointsWhereUniqueInputSchema,
}).strict() ;

export default PointsUpdateArgsSchema;
