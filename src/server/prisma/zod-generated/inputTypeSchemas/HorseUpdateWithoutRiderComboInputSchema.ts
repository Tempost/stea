import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema } from './NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema';
import { MemberUpdateOneWithoutHorseNestedInputSchema } from './MemberUpdateOneWithoutHorseNestedInputSchema';
import { StatusSchema } from './StatusSchema';
import { EnumStatusFieldUpdateOperationsInputSchema } from './EnumStatusFieldUpdateOperationsInputSchema';

export const HorseUpdateWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseUpdateWithoutRiderComboInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  horseRN: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  horseAKA: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema).optional(),
  memberOwner: z.lazy(() => MemberUpdateOneWithoutHorseNestedInputSchema).optional(),
  registrationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regType: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default HorseUpdateWithoutRiderComboInputSchema;
