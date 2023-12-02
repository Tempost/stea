import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { MemberCreateNestedOneWithoutRiderComboInputSchema } from './MemberCreateNestedOneWithoutRiderComboInputSchema';
import { HorseCreateNestedOneWithoutRiderComboInputSchema } from './HorseCreateNestedOneWithoutRiderComboInputSchema';
import { ShowCreateNestedManyWithoutRidersInputSchema } from './ShowCreateNestedManyWithoutRidersInputSchema';

export const RiderComboCreateWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboCreateWithoutPointsInput> = z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().int().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  showYear: z.number().int().optional().nullable(),
  member: z.lazy(() => MemberCreateNestedOneWithoutRiderComboInputSchema),
  horse: z.lazy(() => HorseCreateNestedOneWithoutRiderComboInputSchema),
  shows: z.lazy(() => ShowCreateNestedManyWithoutRidersInputSchema).optional()
}).strict();

export default RiderComboCreateWithoutPointsInputSchema;
