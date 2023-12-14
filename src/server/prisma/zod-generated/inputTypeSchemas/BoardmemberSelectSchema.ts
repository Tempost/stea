import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const BoardmemberSelectSchema: z.ZodType<Prisma.BoardmemberSelect> = z.object({
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  position: z.boolean().optional(),
}).strict()

export default BoardmemberSelectSchema;
