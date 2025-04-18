import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NonMemberHorseOwnerWhereInputSchema } from './NonMemberHorseOwnerWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumPhoneTypeFilterSchema } from './EnumPhoneTypeFilterSchema';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { HorseListRelationFilterSchema } from './HorseListRelationFilterSchema';

export const NonMemberHorseOwnerWhereUniqueInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerWhereUniqueInput> = z.object({
  fullName: z.string().trim()
})
.and(z.object({
  fullName: z.string().trim().optional(),
  AND: z.union([ z.lazy(() => NonMemberHorseOwnerWhereInputSchema),z.lazy(() => NonMemberHorseOwnerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NonMemberHorseOwnerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NonMemberHorseOwnerWhereInputSchema),z.lazy(() => NonMemberHorseOwnerWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "First Name is required" }) ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Last Name is required" }) ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().email({ message: "Invalid email address" }) ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Phone number is required" }) ]).optional(),
  phoneType: z.union([ z.lazy(() => EnumPhoneTypeFilterSchema),z.lazy(() => PhoneTypeSchema) ]).optional(),
  horses: z.lazy(() => HorseListRelationFilterSchema).optional()
}).strict());

export default NonMemberHorseOwnerWhereUniqueInputSchema;
