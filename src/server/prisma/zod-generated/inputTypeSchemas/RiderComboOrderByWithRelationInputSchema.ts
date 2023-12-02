import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MemberOrderByWithRelationInputSchema } from './MemberOrderByWithRelationInputSchema';
import { HorseOrderByWithRelationInputSchema } from './HorseOrderByWithRelationInputSchema';
import { PointsOrderByRelationAggregateInputSchema } from './PointsOrderByRelationAggregateInputSchema';
import { ShowOrderByRelationAggregateInputSchema } from './ShowOrderByRelationAggregateInputSchema';

export const RiderComboOrderByWithRelationInputSchema: z.ZodType<Prisma.RiderComboOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  division: z.lazy(() => SortOrderSchema).optional(),
  totalPoints: z.lazy(() => SortOrderSchema).optional(),
  totalShows: z.lazy(() => SortOrderSchema).optional(),
  completedHT: z.lazy(() => SortOrderSchema).optional(),
  multiVenue: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  horseName: z.lazy(() => SortOrderSchema).optional(),
  showYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  member: z.lazy(() => MemberOrderByWithRelationInputSchema).optional(),
  horse: z.lazy(() => HorseOrderByWithRelationInputSchema).optional(),
  points: z.lazy(() => PointsOrderByRelationAggregateInputSchema).optional(),
  shows: z.lazy(() => ShowOrderByRelationAggregateInputSchema).optional()
}).strict();

export default RiderComboOrderByWithRelationInputSchema;
