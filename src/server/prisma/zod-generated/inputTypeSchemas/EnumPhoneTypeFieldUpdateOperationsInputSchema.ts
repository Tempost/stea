import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PhoneTypeSchema } from './PhoneTypeSchema';

export const EnumPhoneTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPhoneTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PhoneTypeSchema).optional(),
}).strict();

export default EnumPhoneTypeFieldUpdateOperationsInputSchema;
