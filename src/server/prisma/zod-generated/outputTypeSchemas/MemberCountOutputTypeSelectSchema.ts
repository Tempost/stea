import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const MemberCountOutputTypeSelectSchema: z.ZodType<Prisma.MemberCountOutputTypeSelect> = z.object({
  RiderCombo: z.boolean().optional(),
  Horse: z.boolean().optional(),
}).strict();

export default MemberCountOutputTypeSelectSchema;
