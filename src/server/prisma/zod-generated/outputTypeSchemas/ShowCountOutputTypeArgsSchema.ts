import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ShowCountOutputTypeSelectSchema } from './ShowCountOutputTypeSelectSchema';

export const ShowCountOutputTypeArgsSchema: z.ZodType<Prisma.ShowCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ShowCountOutputTypeSelectSchema).nullish(),
}).strict();

export default ShowCountOutputTypeSelectSchema;
