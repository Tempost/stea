import * as z from 'zod';
import {
  CompleteMember,
  RelatedMemberModel,
  CompleteHorse,
  RelatedHorseModel,
  CompletePoints,
  RelatedPointsModel,
  CompleteShow,
  RelatedShowModel,
} from './index';

export const RiderComboModel = z.object({
  uid: z.string().cuid({ message: 'Invalid cuid' }),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  division: z.string(),
  totalPoints: z.number(),
  totalShows: z.number().int(),
  completedHT: z.boolean(),
  multiVenue: z.boolean(),
  memberName: z.string().min(1, { message: 'Member Name is required' }),
  horseName: z.string().min(1, { message: 'Horse Name is required' }),
});

export interface CompleteRiderCombo extends z.infer<typeof RiderComboModel> {
  member: CompleteMember;
  horse: CompleteHorse;
  points: CompletePoints[];
  shows: CompleteShow[];
}

/**
 * RelatedRiderComboModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRiderComboModel: z.ZodSchema<CompleteRiderCombo> = z.lazy(
  () =>
    RiderComboModel.extend({
      member: RelatedMemberModel,
      horse: RelatedHorseModel,
      points: RelatedPointsModel.array(),
      shows: RelatedShowModel.array(),
    })
);
