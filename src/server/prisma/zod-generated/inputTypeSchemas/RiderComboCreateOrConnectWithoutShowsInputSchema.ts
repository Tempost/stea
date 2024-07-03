import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboCreateWithoutShowsInputSchema } from './RiderComboCreateWithoutShowsInputSchema';
import { RiderComboUncheckedCreateWithoutShowsInputSchema } from './RiderComboUncheckedCreateWithoutShowsInputSchema';

export const RiderComboCreateOrConnectWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboCreateOrConnectWithoutShowsInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutShowsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutShowsInputSchema) ]),
}).strict();

export default RiderComboCreateOrConnectWithoutShowsInputSchema;
