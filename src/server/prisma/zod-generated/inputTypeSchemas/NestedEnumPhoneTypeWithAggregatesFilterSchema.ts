import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumPhoneTypeFilterSchema } from './NestedEnumPhoneTypeFilterSchema';

export const NestedEnumPhoneTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPhoneTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PhoneTypeSchema).optional(),
  in: z.lazy(() => PhoneTypeSchema).array().optional(),
  notIn: z.lazy(() => PhoneTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PhoneTypeSchema),z.lazy(() => NestedEnumPhoneTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPhoneTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPhoneTypeFilterSchema).optional()
}).strict();

export default NestedEnumPhoneTypeWithAggregatesFilterSchema;
