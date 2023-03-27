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

export const RiderComboUpdateWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboUpdateWithoutShowsInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  division: z.union([ z.lazy(() => DivisionSchema),z.lazy(() => EnumDivisionFieldUpdateOperationsInputSchema) ]).optional(),
  totalPoints: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalShows: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedHT: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  multiVenue: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  member: z.lazy(() => MemberUpdateOneRequiredWithoutRiderComboNestedInputSchema).optional(),
  horse: z.lazy(() => HorseUpdateOneRequiredWithoutRiderComboNestedInputSchema).optional(),
  points: z.lazy(() => PointsUpdateManyWithoutRiderComboNestedInputSchema).optional()
}).strict();

export default RiderComboUpdateWithoutShowsInputSchema;
