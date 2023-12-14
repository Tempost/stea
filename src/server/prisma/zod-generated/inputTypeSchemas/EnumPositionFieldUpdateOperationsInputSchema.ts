import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PositionSchema } from './PositionSchema';

export const EnumPositionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPositionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PositionSchema).optional()
}).strict();

export default EnumPositionFieldUpdateOperationsInputSchema;
