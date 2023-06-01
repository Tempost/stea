import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumDivisionFilterSchema } from './NestedEnumDivisionFilterSchema';

export const NestedEnumDivisionWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDivisionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DivisionSchema).optional(),
  in: z.union([ z.lazy(() => DivisionSchema).array(),z.lazy(() => DivisionSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => DivisionSchema).array(),z.lazy(() => DivisionSchema) ]).optional(),
  not: z.union([ z.lazy(() => DivisionSchema),z.lazy(() => NestedEnumDivisionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDivisionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDivisionFilterSchema).optional()
}).strict();

export default NestedEnumDivisionWithAggregatesFilterSchema;
