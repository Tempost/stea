import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboCreateNestedOneWithoutPointsInputSchema } from './RiderComboCreateNestedOneWithoutPointsInputSchema';

export const PointsCreateWithoutShowInputSchema: z.ZodType<Prisma.PointsCreateWithoutShowInput> = z.object({
  uid: z.string().optional(),
  points: z.number(),
  place: z.string(),
  RiderCombo: z.lazy(() => RiderComboCreateNestedOneWithoutPointsInputSchema),
}).strict();

export default PointsCreateWithoutShowInputSchema;
