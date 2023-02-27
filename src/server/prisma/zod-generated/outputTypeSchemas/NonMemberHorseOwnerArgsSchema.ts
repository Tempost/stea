import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { NonMemberHorseOwnerSelectSchema } from '../inputTypeSchemas/NonMemberHorseOwnerSelectSchema';
import { NonMemberHorseOwnerIncludeSchema } from '../inputTypeSchemas/NonMemberHorseOwnerIncludeSchema';

export const NonMemberHorseOwnerArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerArgs> = z.object({
  select: z.lazy(() => NonMemberHorseOwnerSelectSchema).optional(),
  include: z.lazy(() => NonMemberHorseOwnerIncludeSchema).optional(),
}).strict();

export default NonMemberHorseOwnerArgsSchema;
