import * as z from "zod"
import { CompleteMember, RelatedMemberModel, CompleteTotalRanking, RelatedTotalRankingModel } from "./index"

export const HorseModel = z.object({
  uid: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  horseRN: z.string().nullish(),
  horseAKA: z.string().nullish(),
  registrationDate: z.date().nullish(),
  regType: z.string(),
  memberId: z.number().int(),
  rankingId: z.number().int().nullish(),
})

export interface CompleteHorse extends z.infer<typeof HorseModel> {
  member: CompleteMember
  ranking?: CompleteTotalRanking | null
}

/**
 * RelatedHorseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHorseModel: z.ZodSchema<CompleteHorse> = z.lazy(() => HorseModel.extend({
  member: RelatedMemberModel,
  ranking: RelatedTotalRankingModel.nullish(),
}))
