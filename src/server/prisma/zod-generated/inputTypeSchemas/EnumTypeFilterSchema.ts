import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TypeSchema } from './TypeSchema';
import { NestedEnumTypeFilterSchema } from './NestedEnumTypeFilterSchema';

export const EnumTypeFilterSchema: z.ZodType<Prisma.EnumTypeFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional(),
  in: z.lazy(() => TypeSchema).array().optional(),
  notIn: z.lazy(() => TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeFilterSchema) ]).optional(),
}).strict();

export default EnumTypeFilterSchema;
