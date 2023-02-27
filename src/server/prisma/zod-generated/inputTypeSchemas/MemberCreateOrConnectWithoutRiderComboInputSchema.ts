import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { MemberWhereUniqueInputSchema } from './MemberWhereUniqueInputSchema';
import { MemberCreateWithoutRiderComboInputSchema } from './MemberCreateWithoutRiderComboInputSchema';
import { MemberUncheckedCreateWithoutRiderComboInputSchema } from './MemberUncheckedCreateWithoutRiderComboInputSchema';

export const MemberCreateOrConnectWithoutRiderComboInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutRiderComboInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberCreateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedCreateWithoutRiderComboInputSchema) ]),
}).strict();

export default MemberCreateOrConnectWithoutRiderComboInputSchema;
