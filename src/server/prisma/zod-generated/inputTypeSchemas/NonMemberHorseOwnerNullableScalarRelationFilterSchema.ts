import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NonMemberHorseOwnerWhereInputSchema } from './NonMemberHorseOwnerWhereInputSchema';

export const NonMemberHorseOwnerNullableScalarRelationFilterSchema: z.ZodType<Prisma.NonMemberHorseOwnerNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => NonMemberHorseOwnerWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NonMemberHorseOwnerWhereInputSchema).optional().nullable()
}).strict();

export default NonMemberHorseOwnerNullableScalarRelationFilterSchema;
