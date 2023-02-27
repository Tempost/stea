import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowCreateNestedOneWithoutPointsInputSchema } from './ShowCreateNestedOneWithoutPointsInputSchema';

export const PointsCreateWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsCreateWithoutRiderComboInput> = z.object({
  uid: z.string().optional(),
  points: z.number(),
  place: z.string(),
  show: z.lazy(() => ShowCreateNestedOneWithoutPointsInputSchema),
}).strict();

export default PointsCreateWithoutRiderComboInputSchema;
