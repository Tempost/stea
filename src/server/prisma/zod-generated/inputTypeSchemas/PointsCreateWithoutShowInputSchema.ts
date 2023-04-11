import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboCreateNestedOneWithoutPointsInputSchema } from './RiderComboCreateNestedOneWithoutPointsInputSchema';

export const PointsCreateWithoutShowInputSchema: z.ZodType<Prisma.PointsCreateWithoutShowInput> = z.object({
  uid: z.string().optional(),
  RiderCombo: z.lazy(() => RiderComboCreateNestedOneWithoutPointsInputSchema),
  points: z.number(),
  place: z.string()
}).strict();

export default PointsCreateWithoutShowInputSchema;
