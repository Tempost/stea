import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ShowOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShowOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default ShowOrderByRelationAggregateInputSchema;
