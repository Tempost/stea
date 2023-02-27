import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithoutHorseInputSchema } from './RiderComboUpdateWithoutHorseInputSchema';
import { RiderComboUncheckedUpdateWithoutHorseInputSchema } from './RiderComboUncheckedUpdateWithoutHorseInputSchema';
import { RiderComboCreateWithoutHorseInputSchema } from './RiderComboCreateWithoutHorseInputSchema';
import { RiderComboUncheckedCreateWithoutHorseInputSchema } from './RiderComboUncheckedCreateWithoutHorseInputSchema';

export const RiderComboUpsertWithWhereUniqueWithoutHorseInputSchema: z.ZodType<Prisma.RiderComboUpsertWithWhereUniqueWithoutHorseInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RiderComboUpdateWithoutHorseInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutHorseInputSchema) ]),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutHorseInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutHorseInputSchema) ]),
}).strict();

export default RiderComboUpsertWithWhereUniqueWithoutHorseInputSchema;
