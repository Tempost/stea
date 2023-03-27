import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';
import { PointsUncheckedCreateNestedManyWithoutShowInputSchema } from './PointsUncheckedCreateNestedManyWithoutShowInputSchema';

export const ShowUncheckedCreateWithoutRidersInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutRidersInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  showName: z.string(),
  showType: z.lazy(() => ShowTypeSchema),
  reviewed: z.boolean().optional(),
  showDate: z.coerce.date(),
  showEndDate: z.coerce.date().optional().nullable(),
  url: z.string().optional().nullable(),
  points: z.lazy(() => PointsUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowUncheckedCreateWithoutRidersInputSchema;
