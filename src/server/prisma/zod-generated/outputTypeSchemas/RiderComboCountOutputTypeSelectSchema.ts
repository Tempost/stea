import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const RiderComboCountOutputTypeSelectSchema: z.ZodType<Prisma.RiderComboCountOutputTypeSelect> = z.object({
  points: z.boolean().optional(),
  shows: z.boolean().optional(),
}).strict();

export default RiderComboCountOutputTypeSelectSchema;
