import { z } from 'zod';
import { PhoneTypeSchema } from '../inputTypeSchemas/PhoneTypeSchema'
import { TypeSchema } from '../inputTypeSchemas/TypeSchema'
import { StatusSchema } from '../inputTypeSchemas/StatusSchema'
import { StatusTypeSchema } from '../inputTypeSchemas/StatusTypeSchema'
import { type RiderComboWithRelations, RiderComboWithRelationsSchema } from './RiderComboSchema'
import { type HorseWithRelations, HorseWithRelationsSchema } from './HorseSchema'
import { type RiderComboPartialWithRelations, RiderComboPartialWithRelationsSchema } from './RiderComboSchema'
import { type HorsePartialWithRelations, HorsePartialWithRelationsSchema } from './HorseSchema'

/////////////////////////////////////////
// MEMBER SCHEMA
/////////////////////////////////////////

export const MemberSchema = z.object({
  phoneType: PhoneTypeSchema,
  memberType: TypeSchema,
  memberStatus: StatusSchema,
  memberStatusType: StatusTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
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
  email: z.string().trim().email({ message: "Invalid email address" }),
  comments: z.string().nullable(),
  /**
   * Member needs to be confirmed by boardmember from dashboard
   */
  confirmed: z.boolean(),
  currentUSEAMember: z.boolean(),
  businessName: z.string().trim().min(1, { message: "Business name is required" }).nullable(),
  membershipDate: z.coerce.date(),
  dateOfBirth: z.coerce.date().nullable(),
  zip: z.number().int({message: "Zipcode is required"}),
  useaMemberID: z.number().int().nullable(),
})

export type Member = z.infer<typeof MemberSchema>

// MEMBER PARTIAL SCHEMA
//------------------------------------------------------

export const MemberPartialSchema = MemberSchema.partial()

export type MemberPartial = z.infer<typeof MemberPartialSchema>

// MEMBER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const MemberOptionalDefaultsSchema = MemberSchema.merge(z.object({
  phoneType: PhoneTypeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  /**
   * Field to determine who is a board member, very few
   */
  boardMember: z.boolean().optional(),
  /**
   * Member needs to be confirmed by boardmember from dashboard
   */
  confirmed: z.boolean().optional(),
  currentUSEAMember: z.boolean().optional(),
  membershipDate: z.coerce.date().optional(),
}))

export type MemberOptionalDefaults = z.infer<typeof MemberOptionalDefaultsSchema>

// MEMBER RELATION SCHEMA
//------------------------------------------------------

export type MemberRelations = {
  RiderCombo: RiderComboWithRelations[];
  Horse: HorseWithRelations[];
};

export type MemberWithRelations = z.infer<typeof MemberSchema> & MemberRelations

export const MemberWithRelationsSchema: z.ZodType<MemberWithRelations> = MemberSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema).array(),
  Horse: z.lazy(() => HorseWithRelationsSchema).array(),
}))

// MEMBER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type MemberOptionalDefaultsWithRelations = z.infer<typeof MemberOptionalDefaultsSchema> & MemberRelations

export const MemberOptionalDefaultsWithRelationsSchema: z.ZodType<MemberOptionalDefaultsWithRelations> = MemberOptionalDefaultsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema).array(),
  Horse: z.lazy(() => HorseWithRelationsSchema).array(),
}))

// MEMBER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type MemberPartialRelations = {
  RiderCombo?: RiderComboPartialWithRelations[];
  Horse?: HorsePartialWithRelations[];
};

export type MemberPartialWithRelations = z.infer<typeof MemberPartialSchema> & MemberPartialRelations

export const MemberPartialWithRelationsSchema: z.ZodType<MemberPartialWithRelations> = MemberPartialSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
  Horse: z.lazy(() => HorsePartialWithRelationsSchema).array(),
})).partial()

export default MemberSchema;
