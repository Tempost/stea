import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithoutHorseInputSchema } from './RiderComboUpdateWithoutHorseInputSchema';
import { RiderComboUncheckedUpdateWithoutHorseInputSchema } from './RiderComboUncheckedUpdateWithoutHorseInputSchema';

export const RiderComboUpdateWithWhereUniqueWithoutHorseInputSchema: z.ZodType<Prisma.RiderComboUpdateWithWhereUniqueWithoutHorseInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RiderComboUpdateWithoutHorseInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutHorseInputSchema) ]),
}).strict();

export default RiderComboUpdateWithWhereUniqueWithoutHorseInputSchema;
