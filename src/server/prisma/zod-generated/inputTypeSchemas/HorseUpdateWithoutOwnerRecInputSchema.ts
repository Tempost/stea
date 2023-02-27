import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { StatusSchema } from './StatusSchema';
import { EnumStatusFieldUpdateOperationsInputSchema } from './EnumStatusFieldUpdateOperationsInputSchema';
import { MemberUpdateOneWithoutHorseNestedInputSchema } from './MemberUpdateOneWithoutHorseNestedInputSchema';
import { RiderComboUpdateManyWithoutHorseNestedInputSchema } from './RiderComboUpdateManyWithoutHorseNestedInputSchema';

export const HorseUpdateWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseUpdateWithoutOwnerRecInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  horseRN: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  horseAKA: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regType: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  memberOwner: z.lazy(() => MemberUpdateOneWithoutHorseNestedInputSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboUpdateManyWithoutHorseNestedInputSchema).optional(),
}).strict();

export default HorseUpdateWithoutOwnerRecInputSchema;
