import * as z from "zod"
import * as imports from "../null"
import { CompleteMember, RelatedMemberModel } from "./index"

export const FamilyMemberModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  name: z.string(),
  email: z.string().nullish(),
  riderLevel: z.string(),
  memberId: z.string(),
})

export interface CompleteFamilyMember extends z.infer<typeof FamilyMemberModel> {
  member: CompleteMember
}

/**
 * RelatedFamilyMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFamilyMemberModel: z.ZodSchema<CompleteFamilyMember> = z.lazy(() => FamilyMemberModel.extend({
  member: RelatedMemberModel,
}))
