import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowUpdateWithoutRidersInputSchema } from './ShowUpdateWithoutRidersInputSchema';
import { ShowUncheckedUpdateWithoutRidersInputSchema } from './ShowUncheckedUpdateWithoutRidersInputSchema';

export const ShowUpdateWithWhereUniqueWithoutRidersInputSchema: z.ZodType<Prisma.ShowUpdateWithWhereUniqueWithoutRidersInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateWithoutRidersInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRidersInputSchema) ]),
}).strict();

export default ShowUpdateWithWhereUniqueWithoutRidersInputSchema;
