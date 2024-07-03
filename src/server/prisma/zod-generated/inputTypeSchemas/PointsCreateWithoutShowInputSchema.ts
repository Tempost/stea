import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboCreateNestedOneWithoutPointsInputSchema } from './RiderComboCreateNestedOneWithoutPointsInputSchema';

export const PointsCreateWithoutShowInputSchema: z.ZodType<Prisma.PointsCreateWithoutShowInput> = z.object({
  uid: z.string().cuid().optional(),
  points: z.number(),
  place: z.string().trim(),
  RiderCombo: z.lazy(() => RiderComboCreateNestedOneWithoutPointsInputSchema)
}).strict();

export default PointsCreateWithoutShowInputSchema;
