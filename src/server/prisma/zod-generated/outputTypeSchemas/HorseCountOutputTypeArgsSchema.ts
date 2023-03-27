import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseCountOutputTypeSelectSchema } from './HorseCountOutputTypeSelectSchema';

export const HorseCountOutputTypeArgsSchema: z.ZodType<Prisma.HorseCountOutputTypeArgs> = z.object({
  select: z.lazy(() => HorseCountOutputTypeSelectSchema).nullish(),
}).strict();

export default HorseCountOutputTypeSelectSchema;
