import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboArgsSchema } from "../outputTypeSchemas/RiderComboArgsSchema"
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"

export const PointsIncludeSchema: z.ZodType<Prisma.PointsInclude> = z.object({
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
}).strict()

export default PointsIncludeSchema;
