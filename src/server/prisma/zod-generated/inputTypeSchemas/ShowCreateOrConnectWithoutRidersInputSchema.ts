import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowCreateWithoutRidersInputSchema } from './ShowCreateWithoutRidersInputSchema';
import { ShowUncheckedCreateWithoutRidersInputSchema } from './ShowUncheckedCreateWithoutRidersInputSchema';

export const ShowCreateOrConnectWithoutRidersInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutRidersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutRidersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRidersInputSchema) ]),
}).strict();

export default ShowCreateOrConnectWithoutRidersInputSchema;
