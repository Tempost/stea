import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithoutMemberInputSchema } from './RiderComboUpdateWithoutMemberInputSchema';
import { RiderComboUncheckedUpdateWithoutMemberInputSchema } from './RiderComboUncheckedUpdateWithoutMemberInputSchema';

export const RiderComboUpdateWithWhereUniqueWithoutMemberInputSchema: z.ZodType<Prisma.RiderComboUpdateWithWhereUniqueWithoutMemberInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RiderComboUpdateWithoutMemberInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutMemberInputSchema) ]),
}).strict();

export default RiderComboUpdateWithWhereUniqueWithoutMemberInputSchema;
