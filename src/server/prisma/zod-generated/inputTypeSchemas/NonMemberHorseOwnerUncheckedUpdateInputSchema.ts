import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { EnumPhoneTypeFieldUpdateOperationsInputSchema } from './EnumPhoneTypeFieldUpdateOperationsInputSchema';
import { HorseUncheckedUpdateManyWithoutOwnerRecNestedInputSchema } from './HorseUncheckedUpdateManyWithoutOwnerRecNestedInputSchema';

export const NonMemberHorseOwnerUncheckedUpdateInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string().trim().min(1, { message: "First Name is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().trim().min(1, { message: "Last Name is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullName: z.union([ z.string().trim(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().email({ message: "Invalid email address" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().trim().min(1, { message: "Phone number is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneType: z.union([ z.lazy(() => PhoneTypeSchema),z.lazy(() => EnumPhoneTypeFieldUpdateOperationsInputSchema) ]).optional(),
  horses: z.lazy(() => HorseUncheckedUpdateManyWithoutOwnerRecNestedInputSchema).optional()
}).strict();

export default NonMemberHorseOwnerUncheckedUpdateInputSchema;
