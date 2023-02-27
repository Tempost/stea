import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboCreateWithoutMemberInputSchema } from './RiderComboCreateWithoutMemberInputSchema';
import { RiderComboUncheckedCreateWithoutMemberInputSchema } from './RiderComboUncheckedCreateWithoutMemberInputSchema';

export const RiderComboCreateOrConnectWithoutMemberInputSchema: z.ZodType<Prisma.RiderComboCreateOrConnectWithoutMemberInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutMemberInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutMemberInputSchema) ]),
}).strict();

export default RiderComboCreateOrConnectWithoutMemberInputSchema;
