import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { DivisionSchema } from './DivisionSchema';
import { MemberCreateNestedOneWithoutRiderComboInputSchema } from './MemberCreateNestedOneWithoutRiderComboInputSchema';
import { HorseCreateNestedOneWithoutRiderComboInputSchema } from './HorseCreateNestedOneWithoutRiderComboInputSchema';
import { ShowCreateNestedManyWithoutRidersInputSchema } from './ShowCreateNestedManyWithoutRidersInputSchema';

export const RiderComboCreateWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboCreateWithoutPointsInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  member: z.lazy(() => MemberCreateNestedOneWithoutRiderComboInputSchema),
  horse: z.lazy(() => HorseCreateNestedOneWithoutRiderComboInputSchema),
  shows: z.lazy(() => ShowCreateNestedManyWithoutRidersInputSchema).optional(),
}).strict();

export default RiderComboCreateWithoutPointsInputSchema;
