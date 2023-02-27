import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StatusSchema } from './StatusSchema';

export const HorseCreateManyOwnerRecInputSchema: z.ZodType<Prisma.HorseCreateManyOwnerRecInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  memberName: z.string().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
}).strict();

export default HorseCreateManyOwnerRecInputSchema;
