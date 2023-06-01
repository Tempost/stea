import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { NestedEnumDivisionWithAggregatesFilterSchema } from './NestedEnumDivisionWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumDivisionFilterSchema } from './NestedEnumDivisionFilterSchema';

export const EnumDivisionWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDivisionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DivisionSchema).optional(),
  in: z.union([ z.lazy(() => DivisionSchema).array(),z.lazy(() => DivisionSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => DivisionSchema).array(),z.lazy(() => DivisionSchema) ]).optional(),
  not: z.union([ z.lazy(() => DivisionSchema),z.lazy(() => NestedEnumDivisionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDivisionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDivisionFilterSchema).optional()
}).strict();

export default EnumDivisionWithAggregatesFilterSchema;
