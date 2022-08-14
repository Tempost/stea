import * as z from "zod"
import { CompleteMember, RelatedMemberModel, CompleteHorse, RelatedHorseModel, CompleteShow, RelatedShowModel, CompleteTotalPoints, RelatedTotalPointsModel } from "./index"

export const RiderComboModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  memberName: z.string(),
  horseName: z.string(),
})

export interface CompleteRiderCombo extends z.infer<typeof RiderComboModel> {
  member: CompleteMember
  horse: CompleteHorse
  shows: CompleteShow[]
  points?: CompleteTotalPoints | null
}

/**
 * RelatedRiderComboModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRiderComboModel: z.ZodSchema<CompleteRiderCombo> = z.lazy(() => RiderComboModel.extend({
  member: RelatedMemberModel,
  horse: RelatedHorseModel,
  shows: RelatedShowModel.array(),
  points: RelatedTotalPointsModel.nullish(),
}))
