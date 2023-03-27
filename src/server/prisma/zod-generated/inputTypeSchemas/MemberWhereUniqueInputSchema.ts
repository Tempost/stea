import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MemberWhereUniqueInputSchema: z.ZodType<Prisma.MemberWhereUniqueInput> = z.object({
  fullName: z.string().optional()
}).strict();

export default MemberWhereUniqueInputSchema;
