import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumPhoneTypeWithAggregatesFilterSchema } from './EnumPhoneTypeWithAggregatesFilterSchema';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { EnumTypeWithAggregatesFilterSchema } from './EnumTypeWithAggregatesFilterSchema';
import { TypeSchema } from './TypeSchema';
import { EnumStatusWithAggregatesFilterSchema } from './EnumStatusWithAggregatesFilterSchema';
import { StatusSchema } from './StatusSchema';
import { EnumStatusTypeWithAggregatesFilterSchema } from './EnumStatusTypeWithAggregatesFilterSchema';
import { StatusTypeSchema } from './StatusTypeSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';

export const MemberScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MemberScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fullName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneType: z.union([ z.lazy(() => EnumPhoneTypeWithAggregatesFilterSchema),z.lazy(() => PhoneTypeSchema) ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  comments: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  confirmed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  businessName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  membershipDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  membershipEnd: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  memberType: z.union([ z.lazy(() => EnumTypeWithAggregatesFilterSchema),z.lazy(() => TypeSchema) ]).optional(),
  memberStatus: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  memberStatusType: z.union([ z.lazy(() => EnumStatusTypeWithAggregatesFilterSchema),z.lazy(() => StatusTypeSchema) ]).optional(),
  dateOfBirth: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  zip: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export default MemberScalarWhereWithAggregatesInputSchema;
