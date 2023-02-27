import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseCreateWithoutRiderComboInputSchema } from './HorseCreateWithoutRiderComboInputSchema';
import { HorseUncheckedCreateWithoutRiderComboInputSchema } from './HorseUncheckedCreateWithoutRiderComboInputSchema';
import { HorseCreateOrConnectWithoutRiderComboInputSchema } from './HorseCreateOrConnectWithoutRiderComboInputSchema';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';

export const HorseCreateNestedOneWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseCreateNestedOneWithoutRiderComboInput> = z.object({
  create: z.union([ z.lazy(() => HorseCreateWithoutRiderComboInputSchema),z.lazy(() => HorseUncheckedCreateWithoutRiderComboInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HorseCreateOrConnectWithoutRiderComboInputSchema).optional(),
  connect: z.lazy(() => HorseWhereUniqueInputSchema).optional(),
}).strict();

export default HorseCreateNestedOneWithoutRiderComboInputSchema;
