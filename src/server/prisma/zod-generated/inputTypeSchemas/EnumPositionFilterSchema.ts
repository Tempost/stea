import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PositionSchema } from './PositionSchema';
import { NestedEnumPositionFilterSchema } from './NestedEnumPositionFilterSchema';

export const EnumPositionFilterSchema: z.ZodType<Prisma.EnumPositionFilter> = z.object({
  equals: z.lazy(() => PositionSchema).optional(),
  in: z.lazy(() => PositionSchema).array().optional(),
  notIn: z.lazy(() => PositionSchema).array().optional(),
  not: z.union([ z.lazy(() => PositionSchema),z.lazy(() => NestedEnumPositionFilterSchema) ]).optional(),
}).strict();

export default EnumPositionFilterSchema;
