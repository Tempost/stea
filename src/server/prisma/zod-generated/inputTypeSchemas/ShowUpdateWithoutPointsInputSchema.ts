import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { ShowTypeSchema } from './ShowTypeSchema';
import { EnumShowTypeFieldUpdateOperationsInputSchema } from './EnumShowTypeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { RiderComboUpdateManyWithoutShowsNestedInputSchema } from './RiderComboUpdateManyWithoutShowsNestedInputSchema';

export const ShowUpdateWithoutPointsInputSchema: z.ZodType<Prisma.ShowUpdateWithoutPointsInput> = z.object({
  uid: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  showName: z.union([ z.string().trim().min(1, { message: "Show name is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showType: z.union([ z.lazy(() => ShowTypeSchema),z.lazy(() => EnumShowTypeFieldUpdateOperationsInputSchema) ]).optional(),
  reviewed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  showDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  showEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string().trim().url({ message: "Must be a valid URL" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  riders: z.lazy(() => RiderComboUpdateManyWithoutShowsNestedInputSchema).optional()
}).strict();

export default ShowUpdateWithoutPointsInputSchema;
