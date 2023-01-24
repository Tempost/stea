import * as z from "zod"
import { PhoneType, Type, Status, StatusType } from "@prisma/client"
import { CompleteRiderCombo, RelatedRiderComboModel, CompleteHorse, RelatedHorseModel } from "./index"

export const MemberModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  fullName: z.string().trim(),
  /**
   * Field to determine who is a board member, very few
   */
  boardMember: z.boolean(),
  address: z.string().trim().min(1, { message: "Address is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  state: z.string().trim().min(1, { message: "State is required" }),
  phone: z.string().trim().min(1, { message: "Phone Number is required" }),
  phoneType: z.nativeEnum(PhoneType),
  email: z.string().trim().email({ message: "Invalid email address" }),
  comments: z.string().nullish(),
  /**
   * Member needs to be confirmed by boardmember from dashboard
   */
  confirmed: z.boolean(),
  currentUSEAMember: z.boolean(),
  businessName: z.string().trim().min(1, { message: "Business name is required" }).nullish(),
  membershipDate: z.date().nullish(),
  memberType: z.nativeEnum(Type),
  memberStatus: z.nativeEnum(Status),
  memberStatusType: z.nativeEnum(StatusType),
  dateOfBirth: z.date().nullish(),
  zip: z.number().int(),
  useaMemberID: z.number().int().nullish(),
})

export interface CompleteMember extends z.infer<typeof MemberModel> {
  RiderCombo: CompleteRiderCombo[]
  Horse: CompleteHorse[]
}

/**
 * RelatedMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMemberModel: z.ZodSchema<CompleteMember> = z.lazy(() => MemberModel.extend({
  /**
   * List of rider combinations member is apart of
   */
  RiderCombo: RelatedRiderComboModel.array(),
  /**
   * List of Horses that are linked to a member
   */
  Horse: RelatedHorseModel.array(),
}))
