import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumPhoneTypeWithAggregatesFilterSchema } from './EnumPhoneTypeWithAggregatesFilterSchema';
import { PhoneTypeSchema } from './PhoneTypeSchema';

export const NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema),z.lazy(() => NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema),z.lazy(() => NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fullName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneType: z.union([ z.lazy(() => EnumPhoneTypeWithAggregatesFilterSchema),z.lazy(() => PhoneTypeSchema) ]).optional(),
}).strict();

export default NonMemberHorseOwnerScalarWhereWithAggregatesInputSchema;
