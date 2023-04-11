import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboCreateNestedOneWithoutPointsInputSchema } from './RiderComboCreateNestedOneWithoutPointsInputSchema';
import { ShowCreateNestedOneWithoutPointsInputSchema } from './ShowCreateNestedOneWithoutPointsInputSchema';

export const PointsCreateInputSchema: z.ZodType<Prisma.PointsCreateInput> = z.object({
  uid: z.string().cuid().optional(),
  RiderCombo: z.lazy(() => RiderComboCreateNestedOneWithoutPointsInputSchema),
  points: z.number(),
  place: z.string().trim(),
  show: z.lazy(() => ShowCreateNestedOneWithoutPointsInputSchema)
}).strict();

export default PointsCreateInputSchema;
