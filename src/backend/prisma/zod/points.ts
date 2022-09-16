import * as z from "zod"
import { CompleteShow, RelatedShowModel, CompleteRiderCombo, RelatedRiderComboModel } from "./index"

export const PointsModel = z.object({
  uid: z.string().cuid({ message: "Invalid cuid" }),
  riderUid: z.string().min(1, { message: "Member Name is required" }),
  showUid: z.string(),
  points: z.number().int().cuid({ message: "Invalid cuid" }),
})

export interface CompletePoints extends z.infer<typeof PointsModel> {
  Show: CompleteShow
  RiderCombo: CompleteRiderCombo
}

/**
 * RelatedPointsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPointsModel: z.ZodSchema<CompletePoints> = z.lazy(() => PointsModel.extend({
  Show: RelatedShowModel,
  RiderCombo: RelatedRiderComboModel,
}))
