import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumStatusFilterSchema } from './NestedEnumStatusFilterSchema';

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.union([ z.lazy(() => StatusSchema).array(),z.lazy(() => StatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => StatusSchema).array(),z.lazy(() => StatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict();

export default NestedEnumStatusWithAggregatesFilterSchema;
