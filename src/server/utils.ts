import { z } from 'zod';
import { ShowTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowTypeSchema';
import { DivisionSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/DivisionSchema';

export const EntrySchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  horseName: z.string().trim(),
  rideType: ShowTypeSchema,
  division: DivisionSchema,
  group: z.enum(['A', 'B', 'C', 'D']),
  finalScore: z.number(),
  placing: z.enum([
    'HC',
    'R',
    'C',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    'W',
    'E',
    'RF',
  ]),
});
export type Entry = z.infer<typeof EntrySchema>;
