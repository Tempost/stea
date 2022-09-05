import * as z from "zod"
import { PhoneType } from "@prisma/client"
import { CompleteHorse, RelatedHorseModel } from "./index"

export const NonMemberHorseOwnerModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  fullName: z.string(),
  email: z.string().min(1),
  phone: z.string().min(1),
  phoneType: z.nativeEnum(PhoneType),
})

export interface CompleteNonMemberHorseOwner extends z.infer<typeof NonMemberHorseOwnerModel> {
  horses: CompleteHorse[]
}

/**
 * RelatedNonMemberHorseOwnerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNonMemberHorseOwnerModel: z.ZodSchema<CompleteNonMemberHorseOwner> = z.lazy(() => NonMemberHorseOwnerModel.extend({
  horses: RelatedHorseModel.array(),
}))
