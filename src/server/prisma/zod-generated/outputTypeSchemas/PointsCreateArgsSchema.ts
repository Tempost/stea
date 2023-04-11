import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsIncludeSchema } from '../inputTypeSchemas/PointsIncludeSchema'
import { PointsCreateInputSchema } from '../inputTypeSchemas/PointsCreateInputSchema'
import { PointsUncheckedCreateInputSchema } from '../inputTypeSchemas/PointsUncheckedCreateInputSchema'
import { RiderComboArgsSchema } from "../outputTypeSchemas/RiderComboArgsSchema"
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PointsSelectSchema: z.ZodType<Prisma.PointsSelect> = z.object({
  uid: z.boolean().optional(),
  riderUid: z.boolean().optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboArgsSchema)]).optional(),
  points: z.boolean().optional(),
  place: z.boolean().optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  showUid: z.boolean().optional(),
}).strict()

export const PointsCreateArgsSchema: z.ZodType<Prisma.PointsCreateArgs> = z.object({
  select: PointsSelectSchema.optional(),
  include: PointsIncludeSchema.optional(),
  data: z.union([ PointsCreateInputSchema,PointsUncheckedCreateInputSchema ]),
}).strict()

export default PointsCreateArgsSchema;
