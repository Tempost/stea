import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';

export const MemberRelationFilterSchema: z.ZodType<Prisma.MemberRelationFilter> = z.object({
  is: z.lazy(() => MemberWhereInputSchema).optional(),
  isNot: z.lazy(() => MemberWhereInputSchema).optional(),
}).strict();

export default MemberRelationFilterSchema;
