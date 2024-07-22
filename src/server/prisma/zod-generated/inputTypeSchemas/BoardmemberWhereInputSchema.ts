import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumPositionFilterSchema } from './EnumPositionFilterSchema';
import { PositionSchema } from './PositionSchema';

export const BoardmemberWhereInputSchema: z.ZodType<Prisma.BoardmemberWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BoardmemberWhereInputSchema),z.lazy(() => BoardmemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BoardmemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BoardmemberWhereInputSchema),z.lazy(() => BoardmemberWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => EnumPositionFilterSchema),z.lazy(() => PositionSchema) ]).optional(),
}).strict();

export default BoardmemberWhereInputSchema;
