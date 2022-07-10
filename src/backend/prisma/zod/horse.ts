import * as z from "zod"
import * as imports from "../null"
import { Type } from "@prisma/client"
import { CompletecorporateMember, RelatedcorporateMemberModel, CompleteTotalRanking, RelatedTotalRankingModel, CompleteMember, RelatedMemberModel } from "./index"

export const HorseModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  horseRN: z.string(),
  horseAKA: z.string().nullish(),
  registrationDate: z.date().nullish(),
  regType: z.nativeEnum(Type),
  corpUid: z.string().nullish(),
  rankingUid: z.string().nullish(),
})

export interface CompleteHorse extends z.infer<typeof HorseModel> {
  corporateMember?: CompletecorporateMember | null
  ranking?: CompleteTotalRanking | null
  riders: CompleteMember[]
}

/**
 * RelatedHorseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHorseModel: z.ZodSchema<CompleteHorse> = z.lazy(() => HorseModel.extend({
  corporateMember: RelatedcorporateMemberModel.nullish(),
  ranking: RelatedTotalRankingModel.nullish(),
  riders: RelatedMemberModel.array(),
}))
