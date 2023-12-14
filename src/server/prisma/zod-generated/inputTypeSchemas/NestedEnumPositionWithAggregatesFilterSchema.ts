import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PositionSchema } from './PositionSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumPositionFilterSchema } from './NestedEnumPositionFilterSchema';

export const NestedEnumPositionWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPositionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PositionSchema).optional(),
  in: z.lazy(() => PositionSchema).array().optional(),
  notIn: z.lazy(() => PositionSchema).array().optional(),
  not: z.union([ z.lazy(() => PositionSchema),z.lazy(() => NestedEnumPositionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPositionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPositionFilterSchema).optional()
}).strict();

export default NestedEnumPositionWithAggregatesFilterSchema;
