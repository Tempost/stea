import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PhoneTypeSchema } from './PhoneTypeSchema';

export const NestedEnumPhoneTypeFilterSchema: z.ZodType<Prisma.NestedEnumPhoneTypeFilter> = z.object({
  equals: z.lazy(() => PhoneTypeSchema).optional(),
  in: z.lazy(() => PhoneTypeSchema).array().optional(),
  notIn: z.lazy(() => PhoneTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PhoneTypeSchema),z.lazy(() => NestedEnumPhoneTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumPhoneTypeFilterSchema;
