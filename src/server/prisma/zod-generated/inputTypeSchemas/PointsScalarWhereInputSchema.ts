import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';

export const PointsScalarWhereInputSchema: z.ZodType<Prisma.PointsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PointsScalarWhereInputSchema),z.lazy(() => PointsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsScalarWhereInputSchema),z.lazy(() => PointsScalarWhereInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  riderUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  place: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  showUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default PointsScalarWhereInputSchema;
