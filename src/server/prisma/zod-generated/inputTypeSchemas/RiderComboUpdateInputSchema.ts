import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { DivisionSchema } from './DivisionSchema';
import { EnumDivisionFieldUpdateOperationsInputSchema } from './EnumDivisionFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { MemberUpdateOneRequiredWithoutRiderComboNestedInputSchema } from './MemberUpdateOneRequiredWithoutRiderComboNestedInputSchema';
import { HorseUpdateOneRequiredWithoutRiderComboNestedInputSchema } from './HorseUpdateOneRequiredWithoutRiderComboNestedInputSchema';
import { PointsUpdateManyWithoutRiderComboNestedInputSchema } from './PointsUpdateManyWithoutRiderComboNestedInputSchema';
import { ShowUpdateManyWithoutRidersNestedInputSchema } from './ShowUpdateManyWithoutRidersNestedInputSchema';

export const RiderComboUpdateInputSchema: z.ZodType<Prisma.RiderComboUpdateInput> = z.object({
  uid: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  division: z.union([ z.lazy(() => DivisionSchema),z.lazy(() => EnumDivisionFieldUpdateOperationsInputSchema) ]).optional(),
  totalPoints: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalShows: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedHT: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  multiVenue: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  member: z.lazy(() => MemberUpdateOneRequiredWithoutRiderComboNestedInputSchema).optional(),
  horse: z.lazy(() => HorseUpdateOneRequiredWithoutRiderComboNestedInputSchema).optional(),
  points: z.lazy(() => PointsUpdateManyWithoutRiderComboNestedInputSchema).optional(),
  shows: z.lazy(() => ShowUpdateManyWithoutRidersNestedInputSchema).optional()
}).strict();

export default RiderComboUpdateInputSchema;
