import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { MemberOrderByWithRelationInputSchema } from './MemberOrderByWithRelationInputSchema';
import { HorseOrderByWithRelationInputSchema } from './HorseOrderByWithRelationInputSchema';
import { PointsOrderByRelationAggregateInputSchema } from './PointsOrderByRelationAggregateInputSchema';
import { ShowOrderByRelationAggregateInputSchema } from './ShowOrderByRelationAggregateInputSchema';

export const RiderComboOrderByWithRelationInputSchema: z.ZodType<Prisma.RiderComboOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  division: z.lazy(() => SortOrderSchema).optional(),
  totalPoints: z.lazy(() => SortOrderSchema).optional(),
  totalShows: z.lazy(() => SortOrderSchema).optional(),
  completedHT: z.lazy(() => SortOrderSchema).optional(),
  multiVenue: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  horseName: z.lazy(() => SortOrderSchema).optional(),
  member: z.lazy(() => MemberOrderByWithRelationInputSchema).optional(),
  horse: z.lazy(() => HorseOrderByWithRelationInputSchema).optional(),
  points: z.lazy(() => PointsOrderByRelationAggregateInputSchema).optional(),
  shows: z.lazy(() => ShowOrderByRelationAggregateInputSchema).optional(),
}).strict();

export default RiderComboOrderByWithRelationInputSchema;
