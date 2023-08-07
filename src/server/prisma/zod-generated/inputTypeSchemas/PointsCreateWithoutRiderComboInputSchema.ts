import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowCreateNestedOneWithoutPointsInputSchema } from './ShowCreateNestedOneWithoutPointsInputSchema';

export const PointsCreateWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsCreateWithoutRiderComboInput> = z.object({
  uid: z.string().cuid().optional(),
  points: z.number(),
  place: z.string().trim(),
  show: z.lazy(() => ShowCreateNestedOneWithoutPointsInputSchema)
}).strict();

export default PointsCreateWithoutRiderComboInputSchema;
