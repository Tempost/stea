import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PointsCreateManyInputSchema: z.ZodType<Prisma.PointsCreateManyInput> = z.object({
  uid: z.string().cuid().optional(),
  riderUid: z.string().trim().min(1, { message: "Member Name is required" }),
  points: z.number(),
  place: z.string().trim(),
  showUid: z.string()
}).strict();

export default PointsCreateManyInputSchema;
