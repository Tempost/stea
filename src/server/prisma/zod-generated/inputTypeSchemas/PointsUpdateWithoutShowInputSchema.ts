import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema } from './RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const PointsUpdateWithoutShowInputSchema: z.ZodType<Prisma.PointsUpdateWithoutShowInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  RiderCombo: z.lazy(() => RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema).optional(),
  points: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  place: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default PointsUpdateWithoutShowInputSchema;
