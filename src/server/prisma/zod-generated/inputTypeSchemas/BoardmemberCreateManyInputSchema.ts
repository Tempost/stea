import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PositionSchema } from './PositionSchema';

export const BoardmemberCreateManyInputSchema: z.ZodType<Prisma.BoardmemberCreateManyInput> = z.object({
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  position: z.lazy(() => PositionSchema)
}).strict();

export default BoardmemberCreateManyInputSchema;
