import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { TypeSchema } from './TypeSchema';

export const EnumTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TypeSchema).optional(),
}).strict();

export default EnumTypeFieldUpdateOperationsInputSchema;
