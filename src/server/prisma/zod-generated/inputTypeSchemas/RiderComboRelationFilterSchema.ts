import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';

export const RiderComboRelationFilterSchema: z.ZodType<Prisma.RiderComboRelationFilter> = z.object({
  is: z.lazy(() => RiderComboWhereInputSchema).optional(),
  isNot: z.lazy(() => RiderComboWhereInputSchema).optional(),
}).strict();

export default RiderComboRelationFilterSchema;
