import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumStatusFilterSchema } from './EnumStatusFilterSchema';
import { StatusSchema } from './StatusSchema';
import { NonMemberHorseOwnerNullableScalarRelationFilterSchema } from './NonMemberHorseOwnerNullableScalarRelationFilterSchema';
import { NonMemberHorseOwnerWhereInputSchema } from './NonMemberHorseOwnerWhereInputSchema';
import { MemberNullableScalarRelationFilterSchema } from './MemberNullableScalarRelationFilterSchema';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';
import { RiderComboListRelationFilterSchema } from './RiderComboListRelationFilterSchema';

export const HorseWhereUniqueInputSchema: z.ZodType<Prisma.HorseWhereUniqueInput> = z.object({
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" })
})
.and(z.object({
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }).optional(),
  AND: z.union([ z.lazy(() => HorseWhereInputSchema),z.lazy(() => HorseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HorseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HorseWhereInputSchema),z.lazy(() => HorseWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  horseAKA: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().trim() ]).optional().nullable(),
  memberName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registrationDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  regType: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  owner: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registrationEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  ownerRec: z.union([ z.lazy(() => NonMemberHorseOwnerNullableScalarRelationFilterSchema),z.lazy(() => NonMemberHorseOwnerWhereInputSchema) ]).optional().nullable(),
  memberOwner: z.union([ z.lazy(() => MemberNullableScalarRelationFilterSchema),z.lazy(() => MemberWhereInputSchema) ]).optional().nullable(),
  RiderCombo: z.lazy(() => RiderComboListRelationFilterSchema).optional()
}).strict());

export default HorseWhereUniqueInputSchema;
