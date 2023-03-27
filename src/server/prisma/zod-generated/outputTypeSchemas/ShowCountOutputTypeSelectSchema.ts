import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ShowCountOutputTypeSelectSchema: z.ZodType<Prisma.ShowCountOutputTypeSelect> = z.object({
  riders: z.boolean().optional(),
  points: z.boolean().optional(),
}).strict();

export default ShowCountOutputTypeSelectSchema;
