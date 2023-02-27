import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseSelectSchema } from '../inputTypeSchemas/HorseSelectSchema';
import { HorseIncludeSchema } from '../inputTypeSchemas/HorseIncludeSchema';

export const HorseArgsSchema: z.ZodType<Prisma.HorseArgs> = z.object({
  select: z.lazy(() => HorseSelectSchema).optional(),
  include: z.lazy(() => HorseIncludeSchema).optional(),
}).strict();

export default HorseArgsSchema;
