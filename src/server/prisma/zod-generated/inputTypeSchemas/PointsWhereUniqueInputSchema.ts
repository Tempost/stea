import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PointsWhereInputSchema } from './PointsWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { RiderComboScalarRelationFilterSchema } from './RiderComboScalarRelationFilterSchema';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';
import { ShowScalarRelationFilterSchema } from './ShowScalarRelationFilterSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const PointsWhereUniqueInputSchema: z.ZodType<Prisma.PointsWhereUniqueInput> = z.object({
  uid: z.string().cuid()
})
.and(z.object({
  uid: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PointsWhereInputSchema),z.lazy(() => PointsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsWhereInputSchema),z.lazy(() => PointsWhereInputSchema).array() ]).optional(),
  riderUid: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Member Name is required" }) ]).optional(),
  points: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  place: z.union([ z.lazy(() => StringFilterSchema),z.string().trim() ]).optional(),
  showUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  RiderCombo: z.union([ z.lazy(() => RiderComboScalarRelationFilterSchema),z.lazy(() => RiderComboWhereInputSchema) ]).optional(),
  show: z.union([ z.lazy(() => ShowScalarRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional(),
}).strict());

export default PointsWhereUniqueInputSchema;
