import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';
import { NestedEnumStatusFilterSchema } from './NestedEnumStatusFilterSchema';

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.union([ z.lazy(() => StatusSchema).array(),z.lazy(() => StatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => StatusSchema).array(),z.lazy(() => StatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict();

export default EnumStatusFilterSchema;
