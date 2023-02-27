import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { EnumDivisionFilterSchema } from './EnumDivisionFilterSchema';
import { DivisionSchema } from './DivisionSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const RiderComboScalarWhereInputSchema: z.ZodType<Prisma.RiderComboScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RiderComboScalarWhereInputSchema),z.lazy(() => RiderComboScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RiderComboScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RiderComboScalarWhereInputSchema),z.lazy(() => RiderComboScalarWhereInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  division: z.union([ z.lazy(() => EnumDivisionFilterSchema),z.lazy(() => DivisionSchema) ]).optional(),
  totalPoints: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalShows: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedHT: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  multiVenue: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  memberName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  horseName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default RiderComboScalarWhereInputSchema;
