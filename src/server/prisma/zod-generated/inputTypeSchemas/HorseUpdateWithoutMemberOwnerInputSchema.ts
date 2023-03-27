import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { StatusSchema } from './StatusSchema';
import { EnumStatusFieldUpdateOperationsInputSchema } from './EnumStatusFieldUpdateOperationsInputSchema';
import { NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema } from './NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema';
import { RiderComboUpdateManyWithoutHorseNestedInputSchema } from './RiderComboUpdateManyWithoutHorseNestedInputSchema';

export const HorseUpdateWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseUpdateWithoutMemberOwnerInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  horseRN: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  horseAKA: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regType: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboUpdateManyWithoutHorseNestedInputSchema).optional()
}).strict();

export default HorseUpdateWithoutMemberOwnerInputSchema;
