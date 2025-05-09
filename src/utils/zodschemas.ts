import { z } from 'zod';
import { HorseOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/HorseSchema';
import { NonMemberHorseOwnerOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/NonMemberHorseOwnerSchema';
import { MemberOptionalDefaultsSchema } from '@/server/prisma/zod-generated/modelSchema/MemberSchema';
import { DivisionSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/DivisionSchema';
import { ShowTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowTypeSchema';
import { CSVEntrySchema } from '@/server/utils';

export const HorseFormSchema = HorseOptionalDefaultsSchema.omit({
  memberName: true,
  owner: true,
}).array();

export const MemberFormSchema = z
  .object({
    horses: z.lazy(() => HorseFormSchema).optional(),
  })
  .merge(
    MemberOptionalDefaultsSchema.omit({
      fullName: true,
      comments: true,
    }),
  );

export const OwnerHorseFormSchema = z
  .object({
    horses: z.lazy(() =>
      HorseFormSchema.min(1, 'At least one horse is required'),
    ),
  })
  .merge(NonMemberHorseOwnerOptionalDefaultsSchema.omit({ fullName: true }));

export type MemberForm = z.infer<typeof MemberFormSchema>;
export type OwnerHorseForm = z.infer<typeof OwnerHorseFormSchema>;
export type HorseForm = z.infer<typeof HorseFormSchema>;

const EntryReviewSchema = z.object({
  fullName: z.string(),
  horseRN: z.string(),
  division: DivisionSchema,
  countInDivision: z.number(),
  rideType: ShowTypeSchema,
  placing: CSVEntrySchema.shape.placing,
  points: z.number(),
});
export type EntryReviewType = z.infer<typeof EntryReviewSchema>;

export const EntrySubmissionSchema = z.array(EntryReviewSchema);

export function isEntrySubmissionType(
  o: any,
): o is z.infer<typeof EntrySubmissionSchema> {
  return Array.isArray(o) && o.every(x => !!x.placing);
}
