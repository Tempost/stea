import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusTypeSchema } from './StatusTypeSchema';

export const NestedEnumStatusTypeFilterSchema: z.ZodType<Prisma.NestedEnumStatusTypeFilter> = z.object({
  equals: z.lazy(() => StatusTypeSchema).optional(),
  in: z.lazy(() => StatusTypeSchema).array().optional(),
  notIn: z.lazy(() => StatusTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusTypeSchema),z.lazy(() => NestedEnumStatusTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumStatusTypeFilterSchema;
