import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ShowCreateWithoutRidersInputSchema } from './ShowCreateWithoutRidersInputSchema';
import { ShowUncheckedCreateWithoutRidersInputSchema } from './ShowUncheckedCreateWithoutRidersInputSchema';
import { ShowCreateOrConnectWithoutRidersInputSchema } from './ShowCreateOrConnectWithoutRidersInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';

export const ShowUncheckedCreateNestedManyWithoutRidersInputSchema: z.ZodType<Prisma.ShowUncheckedCreateNestedManyWithoutRidersInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutRidersInputSchema),z.lazy(() => ShowCreateWithoutRidersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutRidersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRidersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutRidersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutRidersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ShowUncheckedCreateNestedManyWithoutRidersInputSchema;
