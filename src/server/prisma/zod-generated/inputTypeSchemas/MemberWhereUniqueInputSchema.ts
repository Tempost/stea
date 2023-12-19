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
  fullName: z.string()
})
.and(z.object({
  fullName: z.string().optional(),
  AND: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneType: z.union([ z.lazy(() => EnumPhoneTypeFilterSchema),z.lazy(() => PhoneTypeSchema) ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  confirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  businessName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  membershipDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  membershipEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  memberType: z.union([ z.lazy(() => EnumTypeFilterSchema),z.lazy(() => TypeSchema) ]).optional(),
  memberStatus: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  memberStatusType: z.union([ z.lazy(() => EnumStatusTypeFilterSchema),z.lazy(() => StatusTypeSchema) ]).optional(),
  dateOfBirth: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  zip: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  RiderCombo: z.lazy(() => RiderComboListRelationFilterSchema).optional(),
  Horse: z.lazy(() => HorseListRelationFilterSchema).optional()
}).strict());

export default MemberWhereUniqueInputSchema;
