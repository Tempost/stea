import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema } from './RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema';

export const PointsUpdateWithoutShowInputSchema: z.ZodType<Prisma.PointsUpdateWithoutShowInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  place: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  RiderCombo: z.lazy(() => RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema).optional(),
}).strict();

export default PointsUpdateWithoutShowInputSchema;
