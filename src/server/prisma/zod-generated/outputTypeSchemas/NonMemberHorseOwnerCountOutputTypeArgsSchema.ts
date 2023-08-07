import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerCountOutputTypeSelectSchema } from './NonMemberHorseOwnerCountOutputTypeSelectSchema';

export const NonMemberHorseOwnerCountOutputTypeArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NonMemberHorseOwnerCountOutputTypeSelectSchema).nullish(),
}).strict();

export default NonMemberHorseOwnerCountOutputTypeSelectSchema;
