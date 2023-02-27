import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const PointsUncheckedCreateInputSchema: z.ZodType<Prisma.PointsUncheckedCreateInput> = z.object({
  uid: z.string().cuid().optional(),
  riderUid: z.string().trim().min(1, { message: "Member Name is required" }),
  points: z.number(),
  place: z.string().trim(),
  showUid: z.string(),
}).strict();

export default PointsUncheckedCreateInputSchema;
