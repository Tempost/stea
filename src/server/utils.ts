import { z } from 'zod';
import { ShowTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowTypeSchema';
import { DivisionSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/DivisionSchema';
import { HorseForm } from '@/utils/zodschemas';
import { Horse } from '@prisma/client';

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
  AwardsCoordinator: 'Awards Coordinator',
  Points: 'Points',
  AdultMemberAtLarge: 'Adult Member At Large',
  JuniorMemberAtLarge: 'Junior Member At Large',
  SocialMediaManager: 'Social Media Manager',
  VicePresident: 'Vice President',
};
// Get Keys and assert correct key types instead of just string

export const getKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;
export const horseNames = (horses: HorseForm | Array<Horse>) =>
  horses.map(horse => horse.horseRN);
export function groupByFunc<
  RetType extends PropertyKey,
  TObj,
  Func extends (arg: TObj) => RetType,
>(arr: Array<TObj>, mapper: Func): Record<RetType, Array<TObj>> {
  return arr.reduce(
    (accumulator, val) => {
      const groupedKey = mapper(val);
      if (!accumulator[groupedKey]) {
        accumulator[groupedKey] = [];
      }
      accumulator[groupedKey].push(val);
      return accumulator;
    },
    {} as Record<RetType, Array<TObj>>,
  );
}
