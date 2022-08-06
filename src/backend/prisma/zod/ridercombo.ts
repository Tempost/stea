import * as z from "zod"
import { CompleteMember, RelatedMemberModel, CompleteHorse, RelatedHorseModel, CompleteTotalPoints, RelatedTotalPointsModel, CompleteShow, RelatedShowModel } from "./index"

export const RiderComboModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  pointsUid: z.string().nullish(),
  memberName: z.string(),
  horseName: z.string(),
})

export interface CompleteRiderCombo extends z.infer<typeof RiderComboModel> {
  member: CompleteMember
  horse: CompleteHorse
  points?: CompleteTotalPoints | null
  shows: CompleteShow[]
}

/**
 * RelatedRiderComboModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRiderComboModel: z.ZodSchema<CompleteRiderCombo> = z.lazy(() => RiderComboModel.extend({
  member: RelatedMemberModel,
  horse: RelatedHorseModel,
  points: RelatedTotalPointsModel.nullish(),
  shows: RelatedShowModel.array(),
}))
