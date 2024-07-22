import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ShowShowNameShowDateCompoundUniqueInputSchema } from './ShowShowNameShowDateCompoundUniqueInputSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumShowTypeFilterSchema } from './EnumShowTypeFilterSchema';
import { ShowTypeSchema } from './ShowTypeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { RiderComboListRelationFilterSchema } from './RiderComboListRelationFilterSchema';
import { PointsListRelationFilterSchema } from './PointsListRelationFilterSchema';

export const ShowWhereUniqueInputSchema: z.ZodType<Prisma.ShowWhereUniqueInput> = z.union([
  z.object({
    uid: z.string().cuid(),
    showName_showDate: z.lazy(() => ShowShowNameShowDateCompoundUniqueInputSchema)
  }),
  z.object({
    uid: z.string().cuid(),
  }),
  z.object({
    showName_showDate: z.lazy(() => ShowShowNameShowDateCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  uid: z.string().cuid().optional(),
  showName_showDate: z.lazy(() => ShowShowNameShowDateCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  showName: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Show name is required" }) ]).optional(),
  showType: z.union([ z.lazy(() => EnumShowTypeFilterSchema),z.lazy(() => ShowTypeSchema) ]).optional(),
  reviewed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  showDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  showEndDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().trim().url({ message: "Must be a valid URL" }) ]).optional().nullable(),
  riders: z.lazy(() => RiderComboListRelationFilterSchema).optional(),
  points: z.lazy(() => PointsListRelationFilterSchema).optional()
}).strict());

export default ShowWhereUniqueInputSchema;
