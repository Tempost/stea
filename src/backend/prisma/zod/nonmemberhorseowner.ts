import * as z from "zod"
import { PhoneType } from "@prisma/client"
import { CompleteHorse, RelatedHorseModel } from "./index"

export const NonMemberHorseOwnerModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  fullName: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
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
  /**
   * List of Horses that are linked to a member
   */
  horses: RelatedHorseModel.array(),
}))
