import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ShowCreateWithoutPointsInputSchema } from './ShowCreateWithoutPointsInputSchema';
import { ShowUncheckedCreateWithoutPointsInputSchema } from './ShowUncheckedCreateWithoutPointsInputSchema';
import { ShowCreateOrConnectWithoutPointsInputSchema } from './ShowCreateOrConnectWithoutPointsInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';

export const ShowCreateNestedOneWithoutPointsInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutPointsInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutPointsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutPointsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutPointsInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict();

export default ShowCreateNestedOneWithoutPointsInputSchema;
