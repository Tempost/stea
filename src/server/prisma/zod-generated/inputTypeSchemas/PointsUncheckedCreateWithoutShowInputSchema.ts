import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const PointsUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.PointsUncheckedCreateWithoutShowInput> = z.object({
  uid: z.string().cuid().optional(),
  riderUid: z.string().trim().min(1, { message: "Member Name is required" }),
  points: z.number(),
  place: z.string().trim()
}).strict();

export default PointsUncheckedCreateWithoutShowInputSchema;
