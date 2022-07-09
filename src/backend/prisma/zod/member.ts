import * as z from "zod"
import * as imports from "../null"
import { Type, Status, JRSR } from "@prisma/client"
import { CompleteFamilyMember, RelatedFamilyMemberModel, CompleteHorse, RelatedHorseModel, CompleteTotalRanking, RelatedTotalRankingModel, CompleteShow, RelatedShowModel, CompleteRiderCombo, RelatedRiderComboModel } from "./index"

export const MemberModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  memberType: z.nativeEnum(Type),
  memberStatus: z.nativeEnum(Status),
  JRSR: z.nativeEnum(JRSR),
  riderLevel: z.string(),
  rankingId: z.string().nullish(),
  boardMember: z.boolean(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number().int(),
  phone: z.string(),
  email: z.string().nullish(),
  previousMember: z.boolean(),
  confirmed: z.boolean(),
})

export interface CompleteMember extends z.infer<typeof MemberModel> {
  family: CompleteFamilyMember[]
  horses: CompleteHorse[]
  ranking?: CompleteTotalRanking | null
  shows: CompleteShow[]
  RiderCombo: CompleteRiderCombo[]
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
  RiderCombo: RelatedRiderComboModel.array(),
}))
