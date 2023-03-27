import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';

export const RiderComboListRelationFilterSchema: z.ZodType<Prisma.RiderComboListRelationFilter> = z.object({
  every: z.lazy(() => RiderComboWhereInputSchema).optional(),
  some: z.lazy(() => RiderComboWhereInputSchema).optional(),
  none: z.lazy(() => RiderComboWhereInputSchema).optional()
}).strict();

export default RiderComboListRelationFilterSchema;
