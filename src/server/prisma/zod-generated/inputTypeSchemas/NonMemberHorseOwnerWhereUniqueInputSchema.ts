import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const NonMemberHorseOwnerWhereUniqueInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerWhereUniqueInput> = z.object({
  fullName: z.string().optional()
}).strict();

export default NonMemberHorseOwnerWhereUniqueInputSchema;
