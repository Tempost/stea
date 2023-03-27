import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowScalarWhereInputSchema } from './ShowScalarWhereInputSchema';
import { ShowUpdateManyMutationInputSchema } from './ShowUpdateManyMutationInputSchema';
import { ShowUncheckedUpdateManyWithoutShowsInputSchema } from './ShowUncheckedUpdateManyWithoutShowsInputSchema';

export const ShowUpdateManyWithWhereWithoutRidersInputSchema: z.ZodType<Prisma.ShowUpdateManyWithWhereWithoutRidersInput> = z.object({
  where: z.lazy(() => ShowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShowUpdateManyMutationInputSchema),z.lazy(() => ShowUncheckedUpdateManyWithoutShowsInputSchema) ]),
}).strict();

export default ShowUpdateManyWithWhereWithoutRidersInputSchema;
