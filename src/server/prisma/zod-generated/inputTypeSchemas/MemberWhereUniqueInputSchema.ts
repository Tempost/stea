import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumPhoneTypeFilterSchema } from './EnumPhoneTypeFilterSchema';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { EnumTypeFilterSchema } from './EnumTypeFilterSchema';
import { TypeSchema } from './TypeSchema';
import { EnumStatusFilterSchema } from './EnumStatusFilterSchema';
import { StatusSchema } from './StatusSchema';
import { EnumStatusTypeFilterSchema } from './EnumStatusTypeFilterSchema';
import { StatusTypeSchema } from './StatusTypeSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { RiderComboListRelationFilterSchema } from './RiderComboListRelationFilterSchema';
import { HorseListRelationFilterSchema } from './HorseListRelationFilterSchema';

export const MemberWhereUniqueInputSchema: z.ZodType<Prisma.MemberWhereUniqueInput> = z.object({
  fullName: z.string().trim()
})
.and(z.object({
  fullName: z.string().trim().optional(),
  AND: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "First Name is required" }) ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Last Name is required" }) ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Address is required" }) ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "City is required" }) ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "State is required" }) ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Phone Number is required" }) ]).optional(),
  phoneType: z.union([ z.lazy(() => EnumPhoneTypeFilterSchema),z.lazy(() => PhoneTypeSchema) ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().email({ message: "Invalid email address" }) ]).optional(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  confirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  businessName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().trim().min(1, { message: "Business name is required" }) ]).optional().nullable(),
  membershipDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  membershipEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  memberType: z.union([ z.lazy(() => EnumTypeFilterSchema),z.lazy(() => TypeSchema) ]).optional(),
  memberStatus: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  memberStatusType: z.union([ z.lazy(() => EnumStatusTypeFilterSchema),z.lazy(() => StatusTypeSchema) ]).optional(),
  dateOfBirth: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  zip: z.union([ z.lazy(() => IntFilterSchema),z.number().int({message: "Zipcode is required"}) ]).optional(),
  RiderCombo: z.lazy(() => RiderComboListRelationFilterSchema).optional(),
  Horse: z.lazy(() => HorseListRelationFilterSchema).optional()
}).strict());

export default MemberWhereUniqueInputSchema;
