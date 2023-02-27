import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowTypeSchema } from './ShowTypeSchema';

export const EnumShowTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumShowTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ShowTypeSchema).optional(),
}).strict();

export default EnumShowTypeFieldUpdateOperationsInputSchema;
