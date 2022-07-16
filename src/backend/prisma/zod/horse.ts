import * as z from "zod"
import { Status } from "@prisma/client"
import { CompleteMember, RelatedMemberModel, CompleteRiderCombo, RelatedRiderComboModel } from "./index"

export const HorseModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  horseRN: z.string(),
  horseAKA: z.string().nullish(),
  registrationDate: z.date().nullish(),
  regType: z.nativeEnum(Status),
  notConnected: z.boolean(),
})

export interface CompleteHorse extends z.infer<typeof HorseModel> {
  riders: CompleteMember[]
  RiderCombo: CompleteRiderCombo[]
}

/**
 * RelatedHorseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHorseModel: z.ZodSchema<CompleteHorse> = z.lazy(() => HorseModel.extend({
  riders: RelatedMemberModel.array(),
  RiderCombo: RelatedRiderComboModel.array(),
}))
