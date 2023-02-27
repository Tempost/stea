import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboScalarWhereInputSchema } from './RiderComboScalarWhereInputSchema';
import { RiderComboUpdateManyMutationInputSchema } from './RiderComboUpdateManyMutationInputSchema';
import { RiderComboUncheckedUpdateManyWithoutRidersInputSchema } from './RiderComboUncheckedUpdateManyWithoutRidersInputSchema';

export const RiderComboUpdateManyWithWhereWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboUpdateManyWithWhereWithoutShowsInput> = z.object({
  where: z.lazy(() => RiderComboScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RiderComboUpdateManyMutationInputSchema),z.lazy(() => RiderComboUncheckedUpdateManyWithoutRidersInputSchema) ]),
}).strict();

export default RiderComboUpdateManyWithWhereWithoutShowsInputSchema;
