import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';
import { NestedEnumShowTypeWithAggregatesFilterSchema } from './NestedEnumShowTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumShowTypeFilterSchema } from './NestedEnumShowTypeFilterSchema';

export const EnumShowTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumShowTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ShowTypeSchema).optional(),
  in: z.union([ z.lazy(() => ShowTypeSchema).array(),z.lazy(() => ShowTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ShowTypeSchema).array(),z.lazy(() => ShowTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ShowTypeSchema),z.lazy(() => NestedEnumShowTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumShowTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumShowTypeFilterSchema).optional()
}).strict();

export default EnumShowTypeWithAggregatesFilterSchema;
