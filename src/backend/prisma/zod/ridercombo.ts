import * as z from "zod"
import * as imports from "../null"
import { CompleteMember, RelatedMemberModel, CompleteHorse, RelatedHorseModel } from "./index"

export const RiderComboModel = z.object({
  uid: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  riderId: z.number().int(),
  horseId: z.number().int(),
})

export interface CompleteRiderCombo extends z.infer<typeof RiderComboModel> {
  rider: CompleteMember
  horse: CompleteHorse
}

/**
 * RelatedRiderComboModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRiderComboModel: z.ZodSchema<CompleteRiderCombo> = z.lazy(() => RiderComboModel.extend({
  rider: RelatedMemberModel,
  horse: RelatedHorseModel,
}))
