import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema';
import { StatusSchema } from './StatusSchema';
import { RiderComboCreateNestedManyWithoutHorseInputSchema } from './RiderComboCreateNestedManyWithoutHorseInputSchema';

export const HorseCreateWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseCreateWithoutMemberOwnerInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string(),
  horseAKA: z.string().optional().nullable(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema).optional(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  RiderCombo: z.lazy(() => RiderComboCreateNestedManyWithoutHorseInputSchema).optional()
}).strict();

export default HorseCreateWithoutMemberOwnerInputSchema;
