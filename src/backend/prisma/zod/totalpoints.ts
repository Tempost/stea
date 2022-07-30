import * as z from 'zod';
import { CompleteRiderCombo, RelatedRiderComboModel } from './index';

export const TotalPointsModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  division: z.string(),
  totalPoints: z.number(),
  totalShows: z.number().int(),
  completedHT: z.boolean(),
  multiVenue: z.boolean(),
});

export interface CompleteTotalPoints extends z.infer<typeof TotalPointsModel> {
  RiderCombo: CompleteRiderCombo[];
}

/**
 * RelatedTotalPointsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTotalPointsModel: z.ZodSchema<CompleteTotalPoints> = z.lazy(
  () =>
    TotalPointsModel.extend({
      RiderCombo: RelatedRiderComboModel.array(),
    })
);
