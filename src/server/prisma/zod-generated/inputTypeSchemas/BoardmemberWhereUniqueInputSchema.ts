import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PositionSchema } from './PositionSchema';
import { BoardmemberWhereInputSchema } from './BoardmemberWhereInputSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const BoardmemberWhereUniqueInputSchema: z.ZodType<Prisma.BoardmemberWhereUniqueInput> = z.object({
  position: z.lazy(() => PositionSchema)
})
.and(z.object({
  position: z.lazy(() => PositionSchema).optional(),
  AND: z.union([ z.lazy(() => BoardmemberWhereInputSchema),z.lazy(() => BoardmemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BoardmemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BoardmemberWhereInputSchema),z.lazy(() => BoardmemberWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default BoardmemberWhereUniqueInputSchema;
