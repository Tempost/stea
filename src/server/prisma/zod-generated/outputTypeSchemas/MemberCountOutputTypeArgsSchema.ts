import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MemberCountOutputTypeSelectSchema } from './MemberCountOutputTypeSelectSchema';

export const MemberCountOutputTypeArgsSchema: z.ZodType<Prisma.MemberCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MemberCountOutputTypeSelectSchema).nullish(),
}).strict();

export default MemberCountOutputTypeSelectSchema;
