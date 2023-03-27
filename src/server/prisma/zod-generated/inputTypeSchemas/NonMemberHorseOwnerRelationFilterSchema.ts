import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NonMemberHorseOwnerWhereInputSchema } from './NonMemberHorseOwnerWhereInputSchema';

export const NonMemberHorseOwnerRelationFilterSchema: z.ZodType<Prisma.NonMemberHorseOwnerRelationFilter> = z.object({
  is: z.lazy(() => NonMemberHorseOwnerWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NonMemberHorseOwnerWhereInputSchema).optional().nullable()
}).strict();

export default NonMemberHorseOwnerRelationFilterSchema;
