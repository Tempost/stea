import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboScalarWhereInputSchema } from './RiderComboScalarWhereInputSchema';
import { RiderComboUpdateManyMutationInputSchema } from './RiderComboUpdateManyMutationInputSchema';
import { RiderComboUncheckedUpdateManyWithoutRiderComboInputSchema } from './RiderComboUncheckedUpdateManyWithoutRiderComboInputSchema';

export const RiderComboUpdateManyWithWhereWithoutMemberInputSchema: z.ZodType<Prisma.RiderComboUpdateManyWithWhereWithoutMemberInput> = z.object({
  where: z.lazy(() => RiderComboScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RiderComboUpdateManyMutationInputSchema),z.lazy(() => RiderComboUncheckedUpdateManyWithoutRiderComboInputSchema) ]),
}).strict();

export default RiderComboUpdateManyWithWhereWithoutMemberInputSchema;
