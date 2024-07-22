import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberCreateWithoutRiderComboInputSchema } from './MemberCreateWithoutRiderComboInputSchema';
import { MemberUncheckedCreateWithoutRiderComboInputSchema } from './MemberUncheckedCreateWithoutRiderComboInputSchema';
import { MemberCreateOrConnectWithoutRiderComboInputSchema } from './MemberCreateOrConnectWithoutRiderComboInputSchema';
import { MemberWhereUniqueInputSchema } from './MemberWhereUniqueInputSchema';

export const MemberCreateNestedOneWithoutRiderComboInputSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutRiderComboInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedCreateWithoutRiderComboInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutRiderComboInputSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputSchema).optional()
}).strict();

export default MemberCreateNestedOneWithoutRiderComboInputSchema;
