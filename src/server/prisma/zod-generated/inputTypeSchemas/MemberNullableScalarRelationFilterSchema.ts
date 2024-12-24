import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';

export const MemberNullableScalarRelationFilterSchema: z.ZodType<Prisma.MemberNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => MemberWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MemberWhereInputSchema).optional().nullable()
}).strict();

export default MemberNullableScalarRelationFilterSchema;
