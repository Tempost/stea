import type { Prisma } from '@prisma/client';

import { z } from 'zod';
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
  horseRN: z.union([ z.string().trim().min(1, { message: "Registered horse name is required" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  horseAKA: z.union([ z.string().trim(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regType: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  registrationEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema).optional(),
  memberOwner: z.lazy(() => MemberUpdateOneWithoutHorseNestedInputSchema).optional()
}).strict();

export default HorseUpdateWithoutRiderComboInputSchema;
