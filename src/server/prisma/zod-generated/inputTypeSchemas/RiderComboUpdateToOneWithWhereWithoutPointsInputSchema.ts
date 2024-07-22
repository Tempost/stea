import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';
import { RiderComboUpdateWithoutPointsInputSchema } from './RiderComboUpdateWithoutPointsInputSchema';
import { RiderComboUncheckedUpdateWithoutPointsInputSchema } from './RiderComboUncheckedUpdateWithoutPointsInputSchema';

export const RiderComboUpdateToOneWithWhereWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboUpdateToOneWithWhereWithoutPointsInput> = z.object({
  where: z.lazy(() => RiderComboWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RiderComboUpdateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutPointsInputSchema) ]),
}).strict();

export default RiderComboUpdateToOneWithWhereWithoutPointsInputSchema;
