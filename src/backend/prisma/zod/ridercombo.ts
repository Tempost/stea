import * as z from 'zod';
import {
  CompleteMember,
  RelatedMemberModel,
  CompleteHorse,
  RelatedHorseModel,
  CompleteTotalPoints,
  RelatedTotalPointsModel,
} from './index';

export const RiderComboModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  memberName: z.string(),
  horseName: z.string(),
  rankingUid: z.string().nullish(),
});

export interface CompleteRiderCombo extends z.infer<typeof RiderComboModel> {
  member: CompleteMember;
  horse: CompleteHorse;
  ranking?: CompleteTotalPoints | null;
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
      ranking: RelatedTotalPointsModel.nullish(),
    })
);
