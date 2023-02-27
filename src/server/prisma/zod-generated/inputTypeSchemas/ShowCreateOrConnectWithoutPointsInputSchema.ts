import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowCreateWithoutPointsInputSchema } from './ShowCreateWithoutPointsInputSchema';
import { ShowUncheckedCreateWithoutPointsInputSchema } from './ShowUncheckedCreateWithoutPointsInputSchema';

export const ShowCreateOrConnectWithoutPointsInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutPointsInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutPointsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutPointsInputSchema) ]),
}).strict();

export default ShowCreateOrConnectWithoutPointsInputSchema;
