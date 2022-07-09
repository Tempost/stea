import * as z from "zod"
import * as imports from "../null"
import { CompleteFamilyMember, RelatedFamilyMemberModel, CompleteTotalRanking, RelatedTotalRankingModel, CompleteShow, RelatedShowModel, CompleteHorse, RelatedHorseModel, CompletePaymentMethod, RelatedPaymentMethodModel } from "./index"

export const MemberModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  membershipDate: z.date().nullish(),
  memberType: z.string(),
  memberStatus: z.string(),
  boardMember: z.boolean(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number().int(),
  phone: z.string(),
  email: z.string().nullish(),
  comments: z.string(),
  previousMember: z.boolean(),
  riderLevel: z.string(),
  confirmed: z.boolean(),
  rankingUid: z.string().nullish(),
  horseUid: z.string().nullish(),
  paymentMethodUid: z.string(),
})

export interface CompleteMember extends z.infer<typeof MemberModel> {
  family: CompleteFamilyMember[]
  ranking?: CompleteTotalRanking | null
  shows: CompleteShow[]
  horses: CompleteHorse[]
  payment: CompletePaymentMethod
}

/**
 * RelatedMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMemberModel: z.ZodSchema<CompleteMember> = z.lazy(() => MemberModel.extend({
  family: RelatedFamilyMemberModel.array(),
  ranking: RelatedTotalRankingModel.nullish(),
  shows: RelatedShowModel.array(),
  horses: RelatedHorseModel.array(),
  payment: RelatedPaymentMethodModel,
}))
