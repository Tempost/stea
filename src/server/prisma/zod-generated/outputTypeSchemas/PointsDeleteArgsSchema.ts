import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsIncludeSchema } from '../inputTypeSchemas/PointsIncludeSchema'
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

export const PointsDeleteArgsSchema: z.ZodType<Prisma.PointsDeleteArgs> = z.object({
  select: PointsSelectSchema.optional(),
  include: PointsIncludeSchema.optional(),
  where: PointsWhereUniqueInputSchema,
}).strict()

export default PointsDeleteArgsSchema;
