import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithoutMemberInputSchema } from './RiderComboUpdateWithoutMemberInputSchema';
import { RiderComboUncheckedUpdateWithoutMemberInputSchema } from './RiderComboUncheckedUpdateWithoutMemberInputSchema';
import { RiderComboCreateWithoutMemberInputSchema } from './RiderComboCreateWithoutMemberInputSchema';
import { RiderComboUncheckedCreateWithoutMemberInputSchema } from './RiderComboUncheckedCreateWithoutMemberInputSchema';

export const RiderComboUpsertWithWhereUniqueWithoutMemberInputSchema: z.ZodType<Prisma.RiderComboUpsertWithWhereUniqueWithoutMemberInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RiderComboUpdateWithoutMemberInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutMemberInputSchema) ]),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutMemberInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutMemberInputSchema) ]),
}).strict();

export default RiderComboUpsertWithWhereUniqueWithoutMemberInputSchema;
