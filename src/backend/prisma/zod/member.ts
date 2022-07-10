import * as z from "zod"
import * as imports from "../null"
import { Type, Status, JRSR } from "@prisma/client"
import { CompleteFamilyMember, RelatedFamilyMemberModel, CompleteShow, RelatedShowModel, CompleteHorse, RelatedHorseModel, CompletePayment, RelatedPaymentModel } from "./index"

export const MemberModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  membershipDate: z.date().nullish(),
  memberType: z.nativeEnum(Type),
  memberStatus: z.nativeEnum(Status),
  JRSR: z.nativeEnum(JRSR),
  boardMember: z.boolean(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number().int(),
  phone: z.string(),
  email: z.string().nullish(),
  comments: z.string(),
  previousMember: z.boolean(),
  riderLevel: z.string(),
  confirmed: z.boolean(),
})

export interface CompleteMember extends z.infer<typeof MemberModel> {
  family: CompleteFamilyMember[]
  shows: CompleteShow[]
  horses: CompleteHorse[]
  payment?: CompletePayment | null
}

/**
 * RelatedMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMemberModel: z.ZodSchema<CompleteMember> = z.lazy(() => MemberModel.extend({
  family: RelatedFamilyMemberModel.array(),
  shows: RelatedShowModel.array(),
  horses: RelatedHorseModel.array(),
  payment: RelatedPaymentModel.nullish(),
}))
