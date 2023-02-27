import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { EnumDivisionWithAggregatesFilterSchema } from './EnumDivisionWithAggregatesFilterSchema';
import { DivisionSchema } from './DivisionSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';

export const RiderComboScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RiderComboScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RiderComboScalarWhereWithAggregatesInputSchema),z.lazy(() => RiderComboScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RiderComboScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RiderComboScalarWhereWithAggregatesInputSchema),z.lazy(() => RiderComboScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  division: z.union([ z.lazy(() => EnumDivisionWithAggregatesFilterSchema),z.lazy(() => DivisionSchema) ]).optional(),
  totalPoints: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  totalShows: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  completedHT: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  multiVenue: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  memberName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  horseName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default RiderComboScalarWhereWithAggregatesInputSchema;
