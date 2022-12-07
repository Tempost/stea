import {
  HorseModel,
  MemberModel,
  NonMemberHorseOwnerModel,
} from '@/backend/prisma/zod';
import { ShowType } from '@prisma/client';
import { Divisions } from '@/types/common';
import { z } from 'zod';

export const EntryModel = z.object({
  firstName: z.string(),
  lastName: z.string(),
  horseName: z.string(),
  showType: z.nativeEnum(ShowType),
  division: z.nativeEnum(Divisions),
  group: z.enum(['A', 'B', 'C', 'D']),
  finalScore: z.number(),
  placing: z.enum(['HC', 'R', 'C', '1', '2', '3', '4', '5', '6', 'W', 'E', 'RF']),
});

export const MemberFormValues = z.object({
  member: MemberModel.omit({
    fullName: true,
    boardMember: true,
    confirmed: true,
  }),
  horseReg: z.boolean(),
  horses: z.array(HorseModel).optional(),
});

// TODO: Strip any unneed key/values from models
export const OwnerHorseFormValues = z.object({
  owner: NonMemberHorseOwnerModel.omit({ fullName: true }),
  horses: z.array(HorseModel).min(1, 'Horse is required'),
});

export const ShowQueryInput = z
  .object({
    dateRange: z.object({
      curr: z.date(),
      end: z.date(),
    }),
    includes: z.object({
      riders: z.boolean(),
      points: z.boolean(),
    }),
  })
  .deepPartial()
  .optional();

export type MemberFormValues = z.infer<typeof MemberFormValues>;
export type OwnerHorseFormValues = z.infer<typeof OwnerHorseFormValues>;
export type Entry = z.infer<typeof EntryModel>;
