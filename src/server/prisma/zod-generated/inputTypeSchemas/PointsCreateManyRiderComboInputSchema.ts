import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const PointsCreateManyRiderComboInputSchema: z.ZodType<Prisma.PointsCreateManyRiderComboInput> = z.object({
  uid: z.string().cuid().optional(),
  points: z.number(),
  place: z.string(),
  showUid: z.string(),
}).strict();

export default PointsCreateManyRiderComboInputSchema;
