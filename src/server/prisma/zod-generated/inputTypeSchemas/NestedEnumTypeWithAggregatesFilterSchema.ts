import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TypeSchema } from './TypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumTypeFilterSchema } from './NestedEnumTypeFilterSchema';

export const NestedEnumTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional(),
  in: z.lazy(() => TypeSchema).array().optional(),
  notIn: z.lazy(() => TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTypeFilterSchema).optional()
}).strict();

export default NestedEnumTypeWithAggregatesFilterSchema;
