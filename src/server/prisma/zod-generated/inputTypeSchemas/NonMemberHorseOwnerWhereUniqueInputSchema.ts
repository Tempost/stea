import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const NonMemberHorseOwnerWhereUniqueInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerWhereUniqueInput> = z.object({
  fullName: z.string().optional(),
}).strict();

export default NonMemberHorseOwnerWhereUniqueInputSchema;
