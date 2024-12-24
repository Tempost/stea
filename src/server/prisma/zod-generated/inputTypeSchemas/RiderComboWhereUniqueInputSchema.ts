import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInputSchema } from './RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInputSchema';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { EnumDivisionFilterSchema } from './EnumDivisionFilterSchema';
import { DivisionSchema } from './DivisionSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { MemberScalarRelationFilterSchema } from './MemberScalarRelationFilterSchema';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';
import { HorseScalarRelationFilterSchema } from './HorseScalarRelationFilterSchema';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';
import { PointsListRelationFilterSchema } from './PointsListRelationFilterSchema';
import { ShowListRelationFilterSchema } from './ShowListRelationFilterSchema';

export const RiderComboWhereUniqueInputSchema: z.ZodType<Prisma.RiderComboWhereUniqueInput> = z.union([
  z.object({
    uid: z.string().cuid(),
    memberName_horseName_division_showYear: z.lazy(() => RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInputSchema)
  }),
  z.object({
    uid: z.string().cuid(),
  }),
  z.object({
    memberName_horseName_division_showYear: z.lazy(() => RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  uid: z.string().cuid().optional(),
  memberName_horseName_division_showYear: z.lazy(() => RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RiderComboWhereInputSchema),z.lazy(() => RiderComboWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RiderComboWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RiderComboWhereInputSchema),z.lazy(() => RiderComboWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  division: z.union([ z.lazy(() => EnumDivisionFilterSchema),z.lazy(() => DivisionSchema) ]).optional(),
  totalPoints: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalShows: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  completedHT: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  multiVenue: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  memberName: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Member Name is required" }) ]).optional(),
  horseName: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "Horse Name is required" }) ]).optional(),
  showYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  member: z.union([ z.lazy(() => MemberScalarRelationFilterSchema),z.lazy(() => MemberWhereInputSchema) ]).optional(),
  horse: z.union([ z.lazy(() => HorseScalarRelationFilterSchema),z.lazy(() => HorseWhereInputSchema) ]).optional(),
  points: z.lazy(() => PointsListRelationFilterSchema).optional(),
  shows: z.lazy(() => ShowListRelationFilterSchema).optional()
}).strict());

export default RiderComboWhereUniqueInputSchema;
