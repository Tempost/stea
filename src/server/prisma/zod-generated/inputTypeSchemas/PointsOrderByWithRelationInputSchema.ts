import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { RiderComboOrderByWithRelationInputSchema } from './RiderComboOrderByWithRelationInputSchema';
import { ShowOrderByWithRelationInputSchema } from './ShowOrderByWithRelationInputSchema';

export const PointsOrderByWithRelationInputSchema: z.ZodType<Prisma.PointsOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  riderUid: z.lazy(() => SortOrderSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboOrderByWithRelationInputSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  place: z.lazy(() => SortOrderSchema).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
  showUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default PointsOrderByWithRelationInputSchema;
