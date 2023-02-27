import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { EnumStatusWithAggregatesFilterSchema } from './EnumStatusWithAggregatesFilterSchema';
import { StatusSchema } from './StatusSchema';

export const HorseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HorseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HorseScalarWhereWithAggregatesInputSchema),z.lazy(() => HorseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HorseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HorseScalarWhereWithAggregatesInputSchema),z.lazy(() => HorseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  horseRN: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  horseAKA: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  memberName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  registrationDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  regType: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  owner: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default HorseScalarWhereWithAggregatesInputSchema;
