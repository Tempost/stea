import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const PointsUncheckedUpdateWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsUncheckedUpdateWithoutRiderComboInput> = z.object({
  uid: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  place: z.union([ z.string().trim(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default PointsUncheckedUpdateWithoutRiderComboInputSchema;
