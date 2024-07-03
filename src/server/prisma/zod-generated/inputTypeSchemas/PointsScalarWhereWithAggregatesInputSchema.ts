import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';

export const PointsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PointsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PointsScalarWhereWithAggregatesInputSchema),z.lazy(() => PointsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsScalarWhereWithAggregatesInputSchema),z.lazy(() => PointsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  riderUid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  place: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  showUid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default PointsScalarWhereWithAggregatesInputSchema;
