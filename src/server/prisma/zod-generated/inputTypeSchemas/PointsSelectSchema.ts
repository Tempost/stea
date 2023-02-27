import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboArgsSchema } from "../outputTypeSchemas/RiderComboArgsSchema"
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"

export const PointsSelectSchema: z.ZodType<Prisma.PointsSelect> = z.object({
  uid: z.boolean().optional(),
  riderUid: z.boolean().optional(),
  points: z.boolean().optional(),
  place: z.boolean().optional(),
  showUid: z.boolean().optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
}).strict()

export default PointsSelectSchema;
