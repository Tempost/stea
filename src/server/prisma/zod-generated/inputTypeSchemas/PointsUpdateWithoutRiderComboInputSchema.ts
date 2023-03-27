import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { ShowUpdateOneRequiredWithoutPointsNestedInputSchema } from './ShowUpdateOneRequiredWithoutPointsNestedInputSchema';

export const PointsUpdateWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsUpdateWithoutRiderComboInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  place: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutPointsNestedInputSchema).optional()
}).strict();

export default PointsUpdateWithoutRiderComboInputSchema;
