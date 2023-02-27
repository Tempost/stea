import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowCreateWithoutPointsInputSchema } from './ShowCreateWithoutPointsInputSchema';
import { ShowUncheckedCreateWithoutPointsInputSchema } from './ShowUncheckedCreateWithoutPointsInputSchema';
import { ShowCreateOrConnectWithoutPointsInputSchema } from './ShowCreateOrConnectWithoutPointsInputSchema';
import { ShowUpsertWithoutPointsInputSchema } from './ShowUpsertWithoutPointsInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowUpdateWithoutPointsInputSchema } from './ShowUpdateWithoutPointsInputSchema';
import { ShowUncheckedUpdateWithoutPointsInputSchema } from './ShowUncheckedUpdateWithoutPointsInputSchema';

export const ShowUpdateOneRequiredWithoutPointsNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneRequiredWithoutPointsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutPointsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutPointsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutPointsInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutPointsInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithoutPointsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutPointsInputSchema) ]).optional(),
}).strict();

export default ShowUpdateOneRequiredWithoutPointsNestedInputSchema;
