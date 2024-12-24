import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';

export const RiderComboScalarRelationFilterSchema: z.ZodType<Prisma.RiderComboScalarRelationFilter> = z.object({
  is: z.lazy(() => RiderComboWhereInputSchema).optional(),
  isNot: z.lazy(() => RiderComboWhereInputSchema).optional()
}).strict();

export default RiderComboScalarRelationFilterSchema;
