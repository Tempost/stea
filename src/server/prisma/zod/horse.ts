import * as z from "zod"
import { Status } from "@prisma/client"
import { CompleteNonMemberHorseOwner, RelatedNonMemberHorseOwnerModel, CompleteMember, RelatedMemberModel, CompleteRiderCombo, RelatedRiderComboModel } from "./index"

export const HorseModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  /**
   * Registered name of the horse, unique
   */
  horseRN: z.string().min(1, { message: "Registered horse name is required" }),
  /**
   * Barn name of the horse
   */
  horseAKA: z.string().nullish(),
  memberName: z.string().nullish(),
  registrationDate: z.date().nullish(),
  regType: z.nativeEnum(Status),
  owner: z.string().nullish(),
})

export interface CompleteHorse extends z.infer<typeof HorseModel> {
  ownerRec?: CompleteNonMemberHorseOwner | null
  memberOwner?: CompleteMember | null
  RiderCombo: CompleteRiderCombo[]
}

/**
 * RelatedHorseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHorseModel: z.ZodSchema<CompleteHorse> = z.lazy(() => HorseModel.extend({
  ownerRec: RelatedNonMemberHorseOwnerModel.nullish(),
  memberOwner: RelatedMemberModel.nullish(),
  RiderCombo: RelatedRiderComboModel.array(),
}))
