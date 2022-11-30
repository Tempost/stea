import * as z from "zod"
import { CompleteRiderCombo, RelatedRiderComboModel, CompleteShow, RelatedShowModel } from "./index"

export const PointsModel = z.object({
  uid: z.string().cuid({ message: "Invalid cuid" }),
  riderUid: z.string().min(1, { message: "Member Name is required" }),
  points: z.number(),
  place: z.number().int(),
  showUid: z.string(),
})

export interface CompletePoints extends z.infer<typeof PointsModel> {
  RiderCombo: CompleteRiderCombo
  show: CompleteShow
}

/**
 * RelatedPointsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPointsModel: z.ZodSchema<CompletePoints> = z.lazy(() => PointsModel.extend({
  RiderCombo: RelatedRiderComboModel,
  show: RelatedShowModel,
}))
