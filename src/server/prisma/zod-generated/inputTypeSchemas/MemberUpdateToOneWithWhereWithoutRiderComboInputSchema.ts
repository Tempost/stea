import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';
import { MemberUpdateWithoutRiderComboInputSchema } from './MemberUpdateWithoutRiderComboInputSchema';
import { MemberUncheckedUpdateWithoutRiderComboInputSchema } from './MemberUncheckedUpdateWithoutRiderComboInputSchema';

export const MemberUpdateToOneWithWhereWithoutRiderComboInputSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutRiderComboInput> = z.object({
  where: z.lazy(() => MemberWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MemberUpdateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutRiderComboInputSchema) ]),
}).strict();

export default MemberUpdateToOneWithWhereWithoutRiderComboInputSchema;
