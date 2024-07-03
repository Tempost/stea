import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StatusTypeSchema } from './StatusTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumStatusTypeFilterSchema } from './NestedEnumStatusTypeFilterSchema';

export const NestedEnumStatusTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusTypeSchema).optional(),
  in: z.lazy(() => StatusTypeSchema).array().optional(),
  notIn: z.lazy(() => StatusTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusTypeSchema),z.lazy(() => NestedEnumStatusTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusTypeFilterSchema).optional()
}).strict();

export default NestedEnumStatusTypeWithAggregatesFilterSchema;
