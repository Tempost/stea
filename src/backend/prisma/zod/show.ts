import * as z from "zod"
import { CompleteMember, RelatedMemberModel } from "./index"

export const ShowModel = z.object({
  uid: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
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
