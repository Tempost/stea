import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { RiderComboOrderByRelationAggregateInputSchema } from './RiderComboOrderByRelationAggregateInputSchema';
import { PointsOrderByRelationAggregateInputSchema } from './PointsOrderByRelationAggregateInputSchema';

export const ShowOrderByWithRelationInputSchema: z.ZodType<Prisma.ShowOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  showName: z.lazy(() => SortOrderSchema).optional(),
  showType: z.lazy(() => SortOrderSchema).optional(),
  reviewed: z.lazy(() => SortOrderSchema).optional(),
  showDate: z.lazy(() => SortOrderSchema).optional(),
  showEndDate: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  riders: z.lazy(() => RiderComboOrderByRelationAggregateInputSchema).optional(),
  points: z.lazy(() => PointsOrderByRelationAggregateInputSchema).optional(),
}).strict();

export default ShowOrderByWithRelationInputSchema;
