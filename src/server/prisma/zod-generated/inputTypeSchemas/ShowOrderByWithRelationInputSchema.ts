import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RiderComboOrderByRelationAggregateInputSchema } from './RiderComboOrderByRelationAggregateInputSchema';
import { PointsOrderByRelationAggregateInputSchema } from './PointsOrderByRelationAggregateInputSchema';

export const ShowOrderByWithRelationInputSchema: z.ZodType<Prisma.ShowOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  showName: z.lazy(() => SortOrderSchema).optional(),
  showType: z.lazy(() => SortOrderSchema).optional(),
  reviewed: z.lazy(() => SortOrderSchema).optional(),
  showDate: z.lazy(() => SortOrderSchema).optional(),
  showEndDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  riders: z.lazy(() => RiderComboOrderByRelationAggregateInputSchema).optional(),
  points: z.lazy(() => PointsOrderByRelationAggregateInputSchema).optional()
}).strict();

export default ShowOrderByWithRelationInputSchema;
