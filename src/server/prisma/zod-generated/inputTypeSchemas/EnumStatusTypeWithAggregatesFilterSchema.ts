import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusTypeSchema } from './StatusTypeSchema';
import { NestedEnumStatusTypeWithAggregatesFilterSchema } from './NestedEnumStatusTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumStatusTypeFilterSchema } from './NestedEnumStatusTypeFilterSchema';

export const EnumStatusTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusTypeSchema).optional(),
  in: z.union([ z.lazy(() => StatusTypeSchema).array(),z.lazy(() => StatusTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => StatusTypeSchema).array(),z.lazy(() => StatusTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => StatusTypeSchema),z.lazy(() => NestedEnumStatusTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusTypeFilterSchema).optional()
}).strict();

export default EnumStatusTypeWithAggregatesFilterSchema;
