import { z } from 'zod';
import { ShowTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowTypeSchema';
import { DivisionSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/DivisionSchema';

export const CSVEntrySchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  horseName: z.string().trim(),
  rideType: ShowTypeSchema,
  division: DivisionSchema,
  group: z.enum(['A', 'B', 'C', 'D']),
  finalScore: z.coerce.number(),
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
    'TE',
  ]),
});
export type CSVEntry = z.infer<typeof CSVEntrySchema>;

export const mapping = {
  President: 'President',
  Secretary: 'Secretary',
  Treasurer: 'Treasurer',
  Membership: 'Membership',
  Points: 'Points',
  AdultMemberAtLarge: 'Adult Member At Large',
  JuniorMemberAtLarge: 'Junior Member At Large',
  SocialMediaManager: 'Social Media Manager',
  VicePresident: 'Vice President',
};
