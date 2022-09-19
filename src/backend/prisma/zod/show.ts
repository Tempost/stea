import * as z from "zod"
import { CompletePoints, RelatedPointsModel, CompleteRiderCombo, RelatedRiderComboModel } from "./index"

export const ShowModel = z.object({
  uid: z.string().cuid({ message: "Invalid cuid" }),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  showName: z.string().min(1, { message: "Show name is required" }),
  showType: z.string().min(1, { message: "Show type is required" }),
  /**
   * Submitted points have yet to be review by board member
   */
  reviewed: z.boolean(),
  showDate: z.date(),
})

export interface CompleteShow extends z.infer<typeof ShowModel> {
  points: CompletePoints[]
  riders: CompleteRiderCombo[]
}

/**
 * RelatedShowModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedShowModel: z.ZodSchema<CompleteShow> = z.lazy(() => ShowModel.extend({
  points: RelatedPointsModel.array(),
  riders: RelatedRiderComboModel.array(),
}))
