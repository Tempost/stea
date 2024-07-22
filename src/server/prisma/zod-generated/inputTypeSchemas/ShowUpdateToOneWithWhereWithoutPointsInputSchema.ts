import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';
import { ShowUpdateWithoutPointsInputSchema } from './ShowUpdateWithoutPointsInputSchema';
import { ShowUncheckedUpdateWithoutPointsInputSchema } from './ShowUncheckedUpdateWithoutPointsInputSchema';

export const ShowUpdateToOneWithWhereWithoutPointsInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutPointsInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutPointsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutPointsInputSchema) ]),
}).strict();

export default ShowUpdateToOneWithWhereWithoutPointsInputSchema;
