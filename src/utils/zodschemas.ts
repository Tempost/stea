import {
  HorseModel,
  MemberModel,
  NonMemberHorseOwnerModel,
} from '@/server/prisma/zod';
import { ShowType } from '@prisma/client';
import { z } from 'zod';

export const entryModelSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  horseName: z.string().trim(),
  rideType: z.nativeEnum(ShowType),
  division: z.enum(['Prelim', 'Train', 'Novice', 'BGN', 'GOLD', 'GAG']),
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
  divisionCount: z.number().optional(),
});

export const memberFormSchema = z.object({
  member: MemberModel.omit({
    fullName: true,
    boardMember: true,
    confirmed: true,
  }),
  horseReg: z.boolean(),
  horses: z.array(HorseModel).optional(),
});

// TODO: Strip any unneed key/values from models
export const ownerHorseFormSchema = z.object({
  owner: NonMemberHorseOwnerModel.omit({ fullName: true }),
  horses: z.array(HorseModel).min(1, 'Horse is required'),
});

export type MemberForm = z.infer<typeof memberFormSchema>;
export type OwnerHorseForm = z.infer<typeof ownerHorseFormSchema>;
export type Entry = z.infer<typeof entryModelSchema>;
