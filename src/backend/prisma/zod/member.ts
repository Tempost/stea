import * as z from "zod"
import { CompleteFamilyMember, RelatedFamilyMemberModel, CompleteHorse, RelatedHorseModel, CompleteTotalRanking, RelatedTotalRankingModel, CompleteShow, RelatedShowModel } from "./index"

export const MemberModel = z.object({
  uid: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  memberType: z.string(),
  memberStatus: z.string(),
  rankingId: z.number().int().nullish(),
  boardMember: z.boolean(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number().int(),
  phone: z.string(),
  previousMember: z.boolean(),
  riderLevel: z.string(),
  confirmed: z.boolean(),
})

export interface CompleteMember extends z.infer<typeof MemberModel> {
  family: CompleteFamilyMember[]
  horses: CompleteHorse[]
  ranking?: CompleteTotalRanking | null
  shows: CompleteShow[]
}

/**
 * RelatedMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMemberModel: z.ZodSchema<CompleteMember> = z.lazy(() => MemberModel.extend({
  family: RelatedFamilyMemberModel.array(),
  horses: RelatedHorseModel.array(),
  ranking: RelatedTotalRankingModel.nullish(),
  shows: RelatedShowModel.array(),
}))
