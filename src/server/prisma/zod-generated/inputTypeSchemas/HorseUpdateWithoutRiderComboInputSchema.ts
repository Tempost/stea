import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { StatusSchema } from './StatusSchema';
import { EnumStatusFieldUpdateOperationsInputSchema } from './EnumStatusFieldUpdateOperationsInputSchema';
import { NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema } from './NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema';
import { MemberUpdateOneWithoutHorseNestedInputSchema } from './MemberUpdateOneWithoutHorseNestedInputSchema';

export const HorseUpdateWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseUpdateWithoutRiderComboInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  horseRN: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  horseAKA: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regType: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema).optional(),
  memberOwner: z.lazy(() => MemberUpdateOneWithoutHorseNestedInputSchema).optional(),
}).strict();

export default HorseUpdateWithoutRiderComboInputSchema;
