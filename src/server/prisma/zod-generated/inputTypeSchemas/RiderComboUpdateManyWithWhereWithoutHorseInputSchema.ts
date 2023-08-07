import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboScalarWhereInputSchema } from './RiderComboScalarWhereInputSchema';
import { RiderComboUpdateManyMutationInputSchema } from './RiderComboUpdateManyMutationInputSchema';
import { RiderComboUncheckedUpdateManyWithoutHorseInputSchema } from './RiderComboUncheckedUpdateManyWithoutHorseInputSchema';

export const RiderComboUpdateManyWithWhereWithoutHorseInputSchema: z.ZodType<Prisma.RiderComboUpdateManyWithWhereWithoutHorseInput> = z.object({
  where: z.lazy(() => RiderComboScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RiderComboUpdateManyMutationInputSchema),z.lazy(() => RiderComboUncheckedUpdateManyWithoutHorseInputSchema) ]),
}).strict();

export default RiderComboUpdateManyWithWhereWithoutHorseInputSchema;
