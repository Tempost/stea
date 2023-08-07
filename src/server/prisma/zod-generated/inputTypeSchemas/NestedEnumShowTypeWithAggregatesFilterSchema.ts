import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumShowTypeFilterSchema } from './NestedEnumShowTypeFilterSchema';

export const NestedEnumShowTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumShowTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ShowTypeSchema).optional(),
  in: z.lazy(() => ShowTypeSchema).array().optional(),
  notIn: z.lazy(() => ShowTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ShowTypeSchema),z.lazy(() => NestedEnumShowTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumShowTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumShowTypeFilterSchema).optional()
}).strict();

export default NestedEnumShowTypeWithAggregatesFilterSchema;
