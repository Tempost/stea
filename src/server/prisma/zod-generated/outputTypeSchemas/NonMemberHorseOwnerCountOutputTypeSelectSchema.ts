import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const NonMemberHorseOwnerCountOutputTypeSelectSchema: z.ZodType<Prisma.NonMemberHorseOwnerCountOutputTypeSelect> = z.object({
  horses: z.boolean().optional(),
}).strict();

export default NonMemberHorseOwnerCountOutputTypeSelectSchema;
