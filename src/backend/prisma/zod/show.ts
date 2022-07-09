import * as z from "zod"
import * as imports from "../null"
import { CompleteMember, RelatedMemberModel } from "./index"

export const ShowModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  showName: z.string(),
  showType: z.string(),
})

export interface CompleteShow extends z.infer<typeof ShowModel> {
  riders: CompleteMember[]
}

/**
 * RelatedShowModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedShowModel: z.ZodSchema<CompleteShow> = z.lazy(() => ShowModel.extend({
  riders: RelatedMemberModel.array(),
}))
