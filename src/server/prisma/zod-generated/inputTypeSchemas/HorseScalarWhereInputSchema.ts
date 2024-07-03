import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumStatusFilterSchema } from './EnumStatusFilterSchema';
import { StatusSchema } from './StatusSchema';

export const HorseScalarWhereInputSchema: z.ZodType<Prisma.HorseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HorseScalarWhereInputSchema),z.lazy(() => HorseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HorseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HorseScalarWhereInputSchema),z.lazy(() => HorseScalarWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  horseRN: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  horseAKA: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  memberName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registrationDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  regType: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  owner: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registrationEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export default HorseScalarWhereInputSchema;
