import { z } from 'zod';
import { HorseOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/HorseSchema';
import { NonMemberHorseOwnerOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/NonMemberHorseOwnerSchema';
import { MemberOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/MemberSchema';

export const HorseFormSchema = HorseOptionalDefaultsSchema.omit({
  memberName: true,
  owner: true,
}).array();

export const MemberFormSchema = z.object({
  member: z.lazy(() =>
    MemberOptionalDefaultsSchema.omit({ fullName: true, comments: true })
  ),
  horses: z.lazy(() => HorseFormSchema).optional(),
});

export const OwnerHorseFormSchema = z.object({
  owner: NonMemberHorseOwnerOptionalDefaultsSchema.omit({ fullName: true }),
  horses: HorseFormSchema.min(1, 'Horse is required'),
});

export type MemberForm = z.infer<typeof MemberFormSchema>;
export type OwnerHorseForm = z.infer<typeof OwnerHorseFormSchema>;
export type HorseForm = z.infer<typeof HorseFormSchema>;
