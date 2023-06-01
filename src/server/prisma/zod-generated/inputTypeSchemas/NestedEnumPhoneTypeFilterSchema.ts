import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PhoneTypeSchema } from './PhoneTypeSchema';

export const NestedEnumPhoneTypeFilterSchema: z.ZodType<Prisma.NestedEnumPhoneTypeFilter> = z.object({
  equals: z.lazy(() => PhoneTypeSchema).optional(),
  in: z.union([ z.lazy(() => PhoneTypeSchema).array(),z.lazy(() => PhoneTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PhoneTypeSchema).array(),z.lazy(() => PhoneTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => PhoneTypeSchema),z.lazy(() => NestedEnumPhoneTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumPhoneTypeFilterSchema;
