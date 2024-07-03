import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboCreateWithoutMemberInputSchema } from './RiderComboCreateWithoutMemberInputSchema';
import { RiderComboUncheckedCreateWithoutMemberInputSchema } from './RiderComboUncheckedCreateWithoutMemberInputSchema';
import { RiderComboCreateOrConnectWithoutMemberInputSchema } from './RiderComboCreateOrConnectWithoutMemberInputSchema';
import { RiderComboCreateManyMemberInputEnvelopeSchema } from './RiderComboCreateManyMemberInputEnvelopeSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';

export const RiderComboCreateNestedManyWithoutMemberInputSchema: z.ZodType<Prisma.RiderComboCreateNestedManyWithoutMemberInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutMemberInputSchema),z.lazy(() => RiderComboCreateWithoutMemberInputSchema).array(),z.lazy(() => RiderComboUncheckedCreateWithoutMemberInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutMemberInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RiderComboCreateOrConnectWithoutMemberInputSchema),z.lazy(() => RiderComboCreateOrConnectWithoutMemberInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RiderComboCreateManyMemberInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RiderComboCreateNestedManyWithoutMemberInputSchema;
