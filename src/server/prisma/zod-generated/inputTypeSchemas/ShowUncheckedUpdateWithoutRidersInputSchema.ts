import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { ShowTypeSchema } from './ShowTypeSchema';
import { EnumShowTypeFieldUpdateOperationsInputSchema } from './EnumShowTypeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { PointsUncheckedUpdateManyWithoutShowNestedInputSchema } from './PointsUncheckedUpdateManyWithoutShowNestedInputSchema';

export const ShowUncheckedUpdateWithoutRidersInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutRidersInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showType: z.union([ z.lazy(() => ShowTypeSchema),z.lazy(() => EnumShowTypeFieldUpdateOperationsInputSchema) ]).optional(),
  reviewed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  showDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  showEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.lazy(() => PointsUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
}).strict();

export default ShowUncheckedUpdateWithoutRidersInputSchema;
