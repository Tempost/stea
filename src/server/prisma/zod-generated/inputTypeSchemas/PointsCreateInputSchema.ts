import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboCreateNestedOneWithoutPointsInputSchema } from './RiderComboCreateNestedOneWithoutPointsInputSchema';
import { ShowCreateNestedOneWithoutPointsInputSchema } from './ShowCreateNestedOneWithoutPointsInputSchema';

export const PointsCreateInputSchema: z.ZodType<Prisma.PointsCreateInput> = z.object({
  uid: z.string().cuid().optional(),
  points: z.number(),
  place: z.string().trim(),
  RiderCombo: z.lazy(() => RiderComboCreateNestedOneWithoutPointsInputSchema),
  show: z.lazy(() => ShowCreateNestedOneWithoutPointsInputSchema),
}).strict();

export default PointsCreateInputSchema;
