import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { MemberUpdateWithoutRiderComboInputSchema } from './MemberUpdateWithoutRiderComboInputSchema';
import { MemberUncheckedUpdateWithoutRiderComboInputSchema } from './MemberUncheckedUpdateWithoutRiderComboInputSchema';
import { MemberCreateWithoutRiderComboInputSchema } from './MemberCreateWithoutRiderComboInputSchema';
import { MemberUncheckedCreateWithoutRiderComboInputSchema } from './MemberUncheckedCreateWithoutRiderComboInputSchema';

export const MemberUpsertWithoutRiderComboInputSchema: z.ZodType<Prisma.MemberUpsertWithoutRiderComboInput> = z.object({
  update: z.union([ z.lazy(() => MemberUpdateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutRiderComboInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedCreateWithoutRiderComboInputSchema) ]),
}).strict();

export default MemberUpsertWithoutRiderComboInputSchema;
