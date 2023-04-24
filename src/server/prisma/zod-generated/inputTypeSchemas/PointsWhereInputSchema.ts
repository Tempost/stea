import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { RiderComboRelationFilterSchema } from './RiderComboRelationFilterSchema';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';
import { ShowRelationFilterSchema } from './ShowRelationFilterSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const PointsWhereInputSchema: z.ZodType<Prisma.PointsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PointsWhereInputSchema),z.lazy(() => PointsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsWhereInputSchema),z.lazy(() => PointsWhereInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  riderUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  place: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  showUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  RiderCombo: z.union([ z.lazy(() => RiderComboRelationFilterSchema),z.lazy(() => RiderComboWhereInputSchema) ]).optional(),
  show: z.union([ z.lazy(() => ShowRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional(),
}).strict();

export default PointsWhereInputSchema;
