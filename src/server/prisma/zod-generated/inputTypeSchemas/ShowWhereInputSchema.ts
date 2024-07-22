import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { EnumShowTypeFilterSchema } from './EnumShowTypeFilterSchema';
import { ShowTypeSchema } from './ShowTypeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { RiderComboListRelationFilterSchema } from './RiderComboListRelationFilterSchema';
import { PointsListRelationFilterSchema } from './PointsListRelationFilterSchema';

export const ShowWhereInputSchema: z.ZodType<Prisma.ShowWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  showName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  showType: z.union([ z.lazy(() => EnumShowTypeFilterSchema),z.lazy(() => ShowTypeSchema) ]).optional(),
  reviewed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  showDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  showEndDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  riders: z.lazy(() => RiderComboListRelationFilterSchema).optional(),
  points: z.lazy(() => PointsListRelationFilterSchema).optional()
}).strict();

export default ShowWhereInputSchema;
