import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { NestedEnumPhoneTypeFilterSchema } from './NestedEnumPhoneTypeFilterSchema';

export const EnumPhoneTypeFilterSchema: z.ZodType<Prisma.EnumPhoneTypeFilter> = z.object({
  equals: z.lazy(() => PhoneTypeSchema).optional(),
  in: z.union([ z.lazy(() => PhoneTypeSchema).array(),z.lazy(() => PhoneTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PhoneTypeSchema).array(),z.lazy(() => PhoneTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => PhoneTypeSchema),z.lazy(() => NestedEnumPhoneTypeFilterSchema) ]).optional(),
}).strict();

export default EnumPhoneTypeFilterSchema;
