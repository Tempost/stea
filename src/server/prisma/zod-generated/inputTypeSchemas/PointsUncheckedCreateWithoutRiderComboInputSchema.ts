import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const PointsUncheckedCreateWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsUncheckedCreateWithoutRiderComboInput> = z.object({
  uid: z.string().optional(),
  points: z.number(),
  place: z.string(),
  showUid: z.string()
}).strict();

export default PointsUncheckedCreateWithoutRiderComboInputSchema;
