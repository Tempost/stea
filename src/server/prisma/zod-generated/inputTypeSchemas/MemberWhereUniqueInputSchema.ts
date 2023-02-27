import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const MemberWhereUniqueInputSchema: z.ZodType<Prisma.MemberWhereUniqueInput> = z.object({
  fullName: z.string().optional(),
}).strict();

export default MemberWhereUniqueInputSchema;
