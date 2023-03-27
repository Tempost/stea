import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowUpdateWithoutPointsInputSchema } from './ShowUpdateWithoutPointsInputSchema';
import { ShowUncheckedUpdateWithoutPointsInputSchema } from './ShowUncheckedUpdateWithoutPointsInputSchema';
import { ShowCreateWithoutPointsInputSchema } from './ShowCreateWithoutPointsInputSchema';
import { ShowUncheckedCreateWithoutPointsInputSchema } from './ShowUncheckedCreateWithoutPointsInputSchema';

export const ShowUpsertWithoutPointsInputSchema: z.ZodType<Prisma.ShowUpsertWithoutPointsInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutPointsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutPointsInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutPointsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutPointsInputSchema) ]),
}).strict();

export default ShowUpsertWithoutPointsInputSchema;
