import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { MemberCreateNestedOneWithoutRiderComboInputSchema } from './MemberCreateNestedOneWithoutRiderComboInputSchema';
import { PointsCreateNestedManyWithoutRiderComboInputSchema } from './PointsCreateNestedManyWithoutRiderComboInputSchema';
import { ShowCreateNestedManyWithoutRidersInputSchema } from './ShowCreateNestedManyWithoutRidersInputSchema';

export const RiderComboCreateWithoutHorseInputSchema: z.ZodType<Prisma.RiderComboCreateWithoutHorseInput> = z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().int().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  member: z.lazy(() => MemberCreateNestedOneWithoutRiderComboInputSchema),
  points: z.lazy(() => PointsCreateNestedManyWithoutRiderComboInputSchema).optional(),
  shows: z.lazy(() => ShowCreateNestedManyWithoutRidersInputSchema).optional()
}).strict();

export default RiderComboCreateWithoutHorseInputSchema;
