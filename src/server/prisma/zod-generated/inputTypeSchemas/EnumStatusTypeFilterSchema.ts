import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusTypeSchema } from './StatusTypeSchema';
import { NestedEnumStatusTypeFilterSchema } from './NestedEnumStatusTypeFilterSchema';

export const EnumStatusTypeFilterSchema: z.ZodType<Prisma.EnumStatusTypeFilter> = z.object({
  equals: z.lazy(() => StatusTypeSchema).optional(),
  in: z.union([ z.lazy(() => StatusTypeSchema).array(),z.lazy(() => StatusTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => StatusTypeSchema).array(),z.lazy(() => StatusTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => StatusTypeSchema),z.lazy(() => NestedEnumStatusTypeFilterSchema) ]).optional(),
}).strict();

export default EnumStatusTypeFilterSchema;
