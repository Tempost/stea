import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';

export const NestedEnumDivisionFilterSchema: z.ZodType<Prisma.NestedEnumDivisionFilter> = z.object({
  equals: z.lazy(() => DivisionSchema).optional(),
  in: z.lazy(() => DivisionSchema).array().optional(),
  notIn: z.lazy(() => DivisionSchema).array().optional(),
  not: z.union([ z.lazy(() => DivisionSchema),z.lazy(() => NestedEnumDivisionFilterSchema) ]).optional(),
}).strict();

export default NestedEnumDivisionFilterSchema;
