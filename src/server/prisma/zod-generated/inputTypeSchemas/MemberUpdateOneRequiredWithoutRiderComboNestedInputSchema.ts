import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MemberCreateWithoutRiderComboInputSchema } from './MemberCreateWithoutRiderComboInputSchema';
import { MemberUncheckedCreateWithoutRiderComboInputSchema } from './MemberUncheckedCreateWithoutRiderComboInputSchema';
import { MemberCreateOrConnectWithoutRiderComboInputSchema } from './MemberCreateOrConnectWithoutRiderComboInputSchema';
import { MemberUpsertWithoutRiderComboInputSchema } from './MemberUpsertWithoutRiderComboInputSchema';
import { MemberWhereUniqueInputSchema } from './MemberWhereUniqueInputSchema';
import { MemberUpdateToOneWithWhereWithoutRiderComboInputSchema } from './MemberUpdateToOneWithWhereWithoutRiderComboInputSchema';
import { MemberUpdateWithoutRiderComboInputSchema } from './MemberUpdateWithoutRiderComboInputSchema';
import { MemberUncheckedUpdateWithoutRiderComboInputSchema } from './MemberUncheckedUpdateWithoutRiderComboInputSchema';

export const MemberUpdateOneRequiredWithoutRiderComboNestedInputSchema: z.ZodType<Prisma.MemberUpdateOneRequiredWithoutRiderComboNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedCreateWithoutRiderComboInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutRiderComboInputSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutRiderComboInputSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MemberUpdateToOneWithWhereWithoutRiderComboInputSchema),z.lazy(() => MemberUpdateWithoutRiderComboInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutRiderComboInputSchema) ]).optional(),
}).strict();

export default MemberUpdateOneRequiredWithoutRiderComboNestedInputSchema;
