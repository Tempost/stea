import * as z from 'zod';
import { CompleteHorse, RelatedHorseModel } from './index';

export const TotalRankingModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  level: z.string(),
  division: z.string(),
  totalPoints: z.number(),
  totalShows: z.number().int(),
  completedHT: z.boolean(),
  multiVenue: z.boolean(),
});

export interface CompleteTotalRanking
  extends z.infer<typeof TotalRankingModel> {
  horse?: CompleteHorse | null;
}

/**
 * RelatedTotalRankingModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTotalRankingModel: z.ZodSchema<CompleteTotalRanking> =
  z.lazy(() =>
    TotalRankingModel.extend({
      horse: RelatedHorseModel.nullish(),
    })
  );
