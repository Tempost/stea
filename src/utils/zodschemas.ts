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

export const OwnerHorseFormValues = z.object({
  owner: NonMemberHorseOwnerModel,
  horses: z.array(HorseModel).min(1, 'Horse is required'),
});

export type MemberFormValues = z.infer<typeof MemberFormValues>;
export type OwnerHorseFormValues = z.infer<typeof OwnerHorseFormValues>;
