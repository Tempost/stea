import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema } from './RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema';
import { ShowUpdateOneRequiredWithoutPointsNestedInputSchema } from './ShowUpdateOneRequiredWithoutPointsNestedInputSchema';

export const PointsUpdateInputSchema: z.ZodType<Prisma.PointsUpdateInput> = z.object({
  uid: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  place: z.union([ z.string().trim(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  RiderCombo: z.lazy(() => RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutPointsNestedInputSchema).optional(),
}).strict();

export default PointsUpdateInputSchema;
