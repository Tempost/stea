import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithoutShowsInputSchema } from './RiderComboUpdateWithoutShowsInputSchema';
import { RiderComboUncheckedUpdateWithoutShowsInputSchema } from './RiderComboUncheckedUpdateWithoutShowsInputSchema';

export const RiderComboUpdateWithWhereUniqueWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboUpdateWithWhereUniqueWithoutShowsInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RiderComboUpdateWithoutShowsInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutShowsInputSchema) ]),
}).strict();

export default RiderComboUpdateWithWhereUniqueWithoutShowsInputSchema;
