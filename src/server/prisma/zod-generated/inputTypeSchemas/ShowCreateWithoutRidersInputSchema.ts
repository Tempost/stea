import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowTypeSchema } from './ShowTypeSchema';
import { PointsCreateNestedManyWithoutShowInputSchema } from './PointsCreateNestedManyWithoutShowInputSchema';

export const ShowCreateWithoutRidersInputSchema: z.ZodType<Prisma.ShowCreateWithoutRidersInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  showName: z.string(),
  showType: z.lazy(() => ShowTypeSchema),
  reviewed: z.boolean().optional(),
  showDate: z.coerce.date(),
  showEndDate: z.coerce.date().optional().nullable(),
  url: z.string().optional().nullable(),
  points: z.lazy(() => PointsCreateNestedManyWithoutShowInputSchema).optional(),
}).strict();

export default ShowCreateWithoutRidersInputSchema;
