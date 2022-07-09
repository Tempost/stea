import * as z from "zod"
import * as imports from "../null"
import { CompleteHorse, RelatedHorseModel } from "./index"

export const corporateMemberModel = z.object({
  name: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number().int(),
  phone: z.string(),
  email: z.string().nullish(),
  contact: z.string(),
  regType: z.string(),
})

export interface CompletecorporateMember extends z.infer<typeof corporateMemberModel> {
  horses: CompleteHorse[]
}

/**
 * RelatedcorporateMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedcorporateMemberModel: z.ZodSchema<CompletecorporateMember> = z.lazy(() => corporateMemberModel.extend({
  horses: RelatedHorseModel.array(),
}))
