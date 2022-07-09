import * as z from "zod"
import * as imports from "../null"
import { CompleteMember, RelatedMemberModel, CompletecorporateMember, RelatedcorporateMemberModel, CompleteTotalRanking, RelatedTotalRankingModel, CompleteRiderCombo, RelatedRiderComboModel } from "./index"

export const HorseModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  horseRN: z.string(),
  horseAKA: z.string().nullish(),
  registrationDate: z.date().nullish(),
  regType: z.string(),
  memberId: z.string().nullish(),
  corpId: z.string().nullish(),
  rankingId: z.string().nullish(),
})

export interface CompleteHorse extends z.infer<typeof HorseModel> {
  member?: CompleteMember | null
  corporateMember?: CompletecorporateMember | null
  ranking?: CompleteTotalRanking | null
  RiderCombo: CompleteRiderCombo[]
}

/**
 * RelatedHorseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHorseModel: z.ZodSchema<CompleteHorse> = z.lazy(() => HorseModel.extend({
  member: RelatedMemberModel.nullish(),
  corporateMember: RelatedcorporateMemberModel.nullish(),
  ranking: RelatedTotalRankingModel.nullish(),
  RiderCombo: RelatedRiderComboModel.array(),
}))
