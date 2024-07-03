import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithoutShowsInputSchema } from './RiderComboUpdateWithoutShowsInputSchema';
import { RiderComboUncheckedUpdateWithoutShowsInputSchema } from './RiderComboUncheckedUpdateWithoutShowsInputSchema';
import { RiderComboCreateWithoutShowsInputSchema } from './RiderComboCreateWithoutShowsInputSchema';
import { RiderComboUncheckedCreateWithoutShowsInputSchema } from './RiderComboUncheckedCreateWithoutShowsInputSchema';

export const RiderComboUpsertWithWhereUniqueWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboUpsertWithWhereUniqueWithoutShowsInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RiderComboUpdateWithoutShowsInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutShowsInputSchema) ]),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutShowsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutShowsInputSchema) ]),
}).strict();

export default RiderComboUpsertWithWhereUniqueWithoutShowsInputSchema;
