import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';
import { NestedEnumShowTypeFilterSchema } from './NestedEnumShowTypeFilterSchema';

export const EnumShowTypeFilterSchema: z.ZodType<Prisma.EnumShowTypeFilter> = z.object({
  equals: z.lazy(() => ShowTypeSchema).optional(),
  in: z.lazy(() => ShowTypeSchema).array().optional(),
  notIn: z.lazy(() => ShowTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ShowTypeSchema),z.lazy(() => NestedEnumShowTypeFilterSchema) ]).optional(),
}).strict();

export default EnumShowTypeFilterSchema;
