import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const PointsUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.PointsUncheckedCreateWithoutShowInput> = z.object({
  uid: z.string().optional(),
  riderUid: z.string(),
  points: z.number(),
  place: z.string(),
}).strict();

export default PointsUncheckedCreateWithoutShowInputSchema;
