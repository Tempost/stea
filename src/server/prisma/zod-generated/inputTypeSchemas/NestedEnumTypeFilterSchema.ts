import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TypeSchema } from './TypeSchema';

export const NestedEnumTypeFilterSchema: z.ZodType<Prisma.NestedEnumTypeFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional(),
  in: z.union([ z.lazy(() => TypeSchema).array(),z.lazy(() => TypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => TypeSchema).array(),z.lazy(() => TypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumTypeFilterSchema;
