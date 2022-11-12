import {
  HorseModel,
  MemberModel,
  NonMemberHorseOwnerModel,
} from '@/backend/prisma/zod';
import { z } from 'zod';

export const PointsUploadModel = z.object({});

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
