import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';

export const MemberNullableRelationFilterSchema: z.ZodType<Prisma.MemberNullableRelationFilter> = z.object({
  is: z.lazy(() => MemberWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MemberWhereInputSchema).optional().nullable()
}).strict();

export default MemberNullableRelationFilterSchema;
