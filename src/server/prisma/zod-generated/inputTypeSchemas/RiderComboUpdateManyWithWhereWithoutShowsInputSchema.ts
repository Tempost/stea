import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboScalarWhereInputSchema } from './RiderComboScalarWhereInputSchema';
import { RiderComboUpdateManyMutationInputSchema } from './RiderComboUpdateManyMutationInputSchema';
import { RiderComboUncheckedUpdateManyWithoutShowsInputSchema } from './RiderComboUncheckedUpdateManyWithoutShowsInputSchema';

export const RiderComboUpdateManyWithWhereWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboUpdateManyWithWhereWithoutShowsInput> = z.object({
  where: z.lazy(() => RiderComboScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RiderComboUpdateManyMutationInputSchema),z.lazy(() => RiderComboUncheckedUpdateManyWithoutShowsInputSchema) ]),
}).strict();

export default RiderComboUpdateManyWithWhereWithoutShowsInputSchema;
