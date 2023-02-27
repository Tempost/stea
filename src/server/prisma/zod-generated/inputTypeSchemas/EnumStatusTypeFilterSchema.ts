import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StatusTypeSchema } from './StatusTypeSchema';
import { NestedEnumStatusTypeFilterSchema } from './NestedEnumStatusTypeFilterSchema';

export const EnumStatusTypeFilterSchema: z.ZodType<Prisma.EnumStatusTypeFilter> = z.object({
  equals: z.lazy(() => StatusTypeSchema).optional(),
  in: z.lazy(() => StatusTypeSchema).array().optional(),
  notIn: z.lazy(() => StatusTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusTypeSchema),z.lazy(() => NestedEnumStatusTypeFilterSchema) ]).optional(),
}).strict();

export default EnumStatusTypeFilterSchema;
