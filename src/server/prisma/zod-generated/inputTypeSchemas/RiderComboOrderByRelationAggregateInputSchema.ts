import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const RiderComboOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RiderComboOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default RiderComboOrderByRelationAggregateInputSchema;
