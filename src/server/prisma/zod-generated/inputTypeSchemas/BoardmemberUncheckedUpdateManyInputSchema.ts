import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { PositionSchema } from './PositionSchema';
import { EnumPositionFieldUpdateOperationsInputSchema } from './EnumPositionFieldUpdateOperationsInputSchema';

export const BoardmemberUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BoardmemberUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.lazy(() => PositionSchema),z.lazy(() => EnumPositionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default BoardmemberUncheckedUpdateManyInputSchema;
