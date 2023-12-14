import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { EnumPositionWithAggregatesFilterSchema } from './EnumPositionWithAggregatesFilterSchema';
import { PositionSchema } from './PositionSchema';

export const BoardmemberScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BoardmemberScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BoardmemberScalarWhereWithAggregatesInputSchema),z.lazy(() => BoardmemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BoardmemberScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BoardmemberScalarWhereWithAggregatesInputSchema),z.lazy(() => BoardmemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => EnumPositionWithAggregatesFilterSchema),z.lazy(() => PositionSchema) ]).optional(),
}).strict();

export default BoardmemberScalarWhereWithAggregatesInputSchema;
