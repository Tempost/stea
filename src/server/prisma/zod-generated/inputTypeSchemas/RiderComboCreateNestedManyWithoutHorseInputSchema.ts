import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboCreateWithoutHorseInputSchema } from './RiderComboCreateWithoutHorseInputSchema';
import { RiderComboUncheckedCreateWithoutHorseInputSchema } from './RiderComboUncheckedCreateWithoutHorseInputSchema';
import { RiderComboCreateOrConnectWithoutHorseInputSchema } from './RiderComboCreateOrConnectWithoutHorseInputSchema';
import { RiderComboCreateManyHorseInputEnvelopeSchema } from './RiderComboCreateManyHorseInputEnvelopeSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';

export const RiderComboCreateNestedManyWithoutHorseInputSchema: z.ZodType<Prisma.RiderComboCreateNestedManyWithoutHorseInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutHorseInputSchema),z.lazy(() => RiderComboCreateWithoutHorseInputSchema).array(),z.lazy(() => RiderComboUncheckedCreateWithoutHorseInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutHorseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RiderComboCreateOrConnectWithoutHorseInputSchema),z.lazy(() => RiderComboCreateOrConnectWithoutHorseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RiderComboCreateManyHorseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RiderComboCreateNestedManyWithoutHorseInputSchema;
