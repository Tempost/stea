import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { EnumPhoneTypeFieldUpdateOperationsInputSchema } from './EnumPhoneTypeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { TypeSchema } from './TypeSchema';
import { EnumTypeFieldUpdateOperationsInputSchema } from './EnumTypeFieldUpdateOperationsInputSchema';
import { StatusSchema } from './StatusSchema';
import { EnumStatusFieldUpdateOperationsInputSchema } from './EnumStatusFieldUpdateOperationsInputSchema';
import { StatusTypeSchema } from './StatusTypeSchema';
import { EnumStatusTypeFieldUpdateOperationsInputSchema } from './EnumStatusTypeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableIntFieldUpdateOperationsInputSchema } from './NullableIntFieldUpdateOperationsInputSchema';
import { RiderComboUncheckedUpdateManyWithoutMemberNestedInputSchema } from './RiderComboUncheckedUpdateManyWithoutMemberNestedInputSchema';
import { HorseUncheckedUpdateManyWithoutMemberOwnerNestedInputSchema } from './HorseUncheckedUpdateManyWithoutMemberOwnerNestedInputSchema';

export const MemberUncheckedUpdateInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string().trim().min(1, { message: "First Name is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().trim().min(1, { message: "Last Name is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullName: z.union([ z.string().trim(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  boardMember: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string().trim().min(1, { message: "Address is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string().trim().min(1, { message: "City is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string().trim().min(1, { message: "State is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().trim().min(1, { message: "Phone Number is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneType: z.union([ z.lazy(() => PhoneTypeSchema),z.lazy(() => EnumPhoneTypeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().email({ message: "Invalid email address" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  confirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  businessName: z.union([ z.string().trim().min(1, { message: "Business name is required" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberType: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  memberStatus: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  memberStatusType: z.union([ z.lazy(() => StatusTypeSchema),z.lazy(() => EnumStatusTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.number().int({message: "Zipcode is required"}),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  useaMemberID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  RiderCombo: z.lazy(() => RiderComboUncheckedUpdateManyWithoutMemberNestedInputSchema).optional(),
  Horse: z.lazy(() => HorseUncheckedUpdateManyWithoutMemberOwnerNestedInputSchema).optional()
}).strict();

export default MemberUncheckedUpdateInputSchema;
