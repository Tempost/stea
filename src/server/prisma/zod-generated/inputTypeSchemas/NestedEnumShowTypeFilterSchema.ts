import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';

export const NestedEnumShowTypeFilterSchema: z.ZodType<Prisma.NestedEnumShowTypeFilter> = z.object({
  equals: z.lazy(() => ShowTypeSchema).optional(),
  in: z.union([ z.lazy(() => ShowTypeSchema).array(),z.lazy(() => ShowTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ShowTypeSchema).array(),z.lazy(() => ShowTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ShowTypeSchema),z.lazy(() => NestedEnumShowTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumShowTypeFilterSchema;
