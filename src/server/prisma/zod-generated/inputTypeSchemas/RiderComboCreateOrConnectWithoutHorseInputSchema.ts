import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboCreateWithoutHorseInputSchema } from './RiderComboCreateWithoutHorseInputSchema';
import { RiderComboUncheckedCreateWithoutHorseInputSchema } from './RiderComboUncheckedCreateWithoutHorseInputSchema';

export const RiderComboCreateOrConnectWithoutHorseInputSchema: z.ZodType<Prisma.RiderComboCreateOrConnectWithoutHorseInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutHorseInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutHorseInputSchema) ]),
}).strict();

export default RiderComboCreateOrConnectWithoutHorseInputSchema;
