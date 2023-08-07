import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema } from './RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { EnumDivisionFilterSchema } from './EnumDivisionFilterSchema';
import { DivisionSchema } from './DivisionSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { MemberRelationFilterSchema } from './MemberRelationFilterSchema';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';
import { HorseRelationFilterSchema } from './HorseRelationFilterSchema';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';
import { PointsListRelationFilterSchema } from './PointsListRelationFilterSchema';
import { ShowListRelationFilterSchema } from './ShowListRelationFilterSchema';

export const RiderComboWhereUniqueInputSchema: z.ZodType<Prisma.RiderComboWhereUniqueInput> = z.union([
  z.object({
    uid: z.string(),
    memberName_horseName_division: z.lazy(() => RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema)
  }),
  z.object({
    uid: z.string(),
  }),
  z.object({
    memberName_horseName_division: z.lazy(() => RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  uid: z.string().optional(),
  memberName_horseName_division: z.lazy(() => RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RiderComboWhereInputSchema),z.lazy(() => RiderComboWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RiderComboWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RiderComboWhereInputSchema),z.lazy(() => RiderComboWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  division: z.union([ z.lazy(() => EnumDivisionFilterSchema),z.lazy(() => DivisionSchema) ]).optional(),
  totalPoints: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalShows: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedHT: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  multiVenue: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  memberName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  horseName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  member: z.union([ z.lazy(() => MemberRelationFilterSchema),z.lazy(() => MemberWhereInputSchema) ]).optional(),
  horse: z.union([ z.lazy(() => HorseRelationFilterSchema),z.lazy(() => HorseWhereInputSchema) ]).optional(),
  points: z.lazy(() => PointsListRelationFilterSchema).optional(),
  shows: z.lazy(() => ShowListRelationFilterSchema).optional()
}).strict());

export default RiderComboWhereUniqueInputSchema;
