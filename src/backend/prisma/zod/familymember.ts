import * as z from "zod"
import { JRSR } from "@prisma/client"
import { CompleteMember, RelatedMemberModel } from "./index"

export const FamilyMemberModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  name: z.string(),
  email: z.string().nullish(),
  notConnected: z.boolean().nullish(),
  JRSR: z.nativeEnum(JRSR),
  memberName: z.string(),
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
