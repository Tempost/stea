import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PointsCreateManyRiderComboInputSchema: z.ZodType<Prisma.PointsCreateManyRiderComboInput> = z.object({
  uid: z.string().cuid().optional(),
  points: z.number(),
  place: z.string().trim(),
  showUid: z.string()
}).strict();

export default PointsCreateManyRiderComboInputSchema;
