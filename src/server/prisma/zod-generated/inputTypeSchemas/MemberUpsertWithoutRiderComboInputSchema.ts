import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberUpdateWithoutRiderComboInputSchema } from './MemberUpdateWithoutRiderComboInputSchema';
import { MemberUncheckedUpdateWithoutRiderComboInputSchema } from './MemberUncheckedUpdateWithoutRiderComboInputSchema';
import { MemberCreateWithoutRiderComboInputSchema } from './MemberCreateWithoutRiderComboInputSchema';
import { MemberUncheckedCreateWithoutRiderComboInputSchema } from './MemberUncheckedCreateWithoutRiderComboInputSchema';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';

export const MemberUpsertWithoutRiderComboInputSchema: z.ZodType<Prisma.MemberUpsertWithoutRiderComboInput> = z.object({
  update: z.union([ z.lazy(() => MemberUpdateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutRiderComboInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedCreateWithoutRiderComboInputSchema) ]),
  where: z.lazy(() => MemberWhereInputSchema).optional()
}).strict();

export default MemberUpsertWithoutRiderComboInputSchema;
