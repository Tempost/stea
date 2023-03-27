import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';

export const HorseCreateManyInputSchema: z.ZodType<Prisma.HorseCreateManyInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  memberName: z.string().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  owner: z.string().optional().nullable()
}).strict();

export default HorseCreateManyInputSchema;
