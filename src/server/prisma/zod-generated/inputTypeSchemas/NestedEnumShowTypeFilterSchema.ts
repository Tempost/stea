import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowTypeSchema } from './ShowTypeSchema';

export const NestedEnumShowTypeFilterSchema: z.ZodType<Prisma.NestedEnumShowTypeFilter> = z.object({
  equals: z.lazy(() => ShowTypeSchema).optional(),
  in: z.lazy(() => ShowTypeSchema).array().optional(),
  notIn: z.lazy(() => ShowTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ShowTypeSchema),z.lazy(() => NestedEnumShowTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumShowTypeFilterSchema;
