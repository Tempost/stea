import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const HorseCountOutputTypeSelectSchema: z.ZodType<Prisma.HorseCountOutputTypeSelect> = z.object({
  RiderCombo: z.boolean().optional(),
}).strict();

export default HorseCountOutputTypeSelectSchema;
