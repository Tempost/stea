import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowUpdateWithoutRidersInputSchema } from './ShowUpdateWithoutRidersInputSchema';
import { ShowUncheckedUpdateWithoutRidersInputSchema } from './ShowUncheckedUpdateWithoutRidersInputSchema';
import { ShowCreateWithoutRidersInputSchema } from './ShowCreateWithoutRidersInputSchema';
import { ShowUncheckedCreateWithoutRidersInputSchema } from './ShowUncheckedCreateWithoutRidersInputSchema';

export const ShowUpsertWithWhereUniqueWithoutRidersInputSchema: z.ZodType<Prisma.ShowUpsertWithWhereUniqueWithoutRidersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShowUpdateWithoutRidersInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRidersInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutRidersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRidersInputSchema) ]),
}).strict();

export default ShowUpsertWithWhereUniqueWithoutRidersInputSchema;
