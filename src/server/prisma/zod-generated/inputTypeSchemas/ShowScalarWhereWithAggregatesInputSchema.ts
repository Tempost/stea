import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { EnumShowTypeWithAggregatesFilterSchema } from './EnumShowTypeWithAggregatesFilterSchema';
import { ShowTypeSchema } from './ShowTypeSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const ShowScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShowScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  showName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  showType: z.union([ z.lazy(() => EnumShowTypeWithAggregatesFilterSchema),z.lazy(() => ShowTypeSchema) ]).optional(),
  reviewed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  showDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  showEndDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default ShowScalarWhereWithAggregatesInputSchema;
