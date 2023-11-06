import { z } from 'zod';
import { PhoneTypeSchema } from '../inputTypeSchemas/PhoneTypeSchema'
import { TypeSchema } from '../inputTypeSchemas/TypeSchema'
import { StatusSchema } from '../inputTypeSchemas/StatusSchema'
import { StatusTypeSchema } from '../inputTypeSchemas/StatusTypeSchema'
import type { RiderComboWithRelations } from './RiderComboSchema'
import type { RiderComboPartialWithRelations } from './RiderComboSchema'
import type { RiderComboOptionalDefaultsWithRelations } from './RiderComboSchema'
import type { HorseWithRelations } from './HorseSchema'
import type { HorsePartialWithRelations } from './HorseSchema'
import type { HorseOptionalDefaultsWithRelations } from './HorseSchema'
import { RiderComboWithRelationsSchema } from './RiderComboSchema'
import { RiderComboPartialWithRelationsSchema } from './RiderComboSchema'
import { RiderComboOptionalDefaultsWithRelationsSchema } from './RiderComboSchema'
import { HorseWithRelationsSchema } from './HorseSchema'
import { HorsePartialWithRelationsSchema } from './HorseSchema'
import { HorseOptionalDefaultsWithRelationsSchema } from './HorseSchema'

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
  businessName: z.string().trim().min(1, { message: "Business name is required" }).nullable(),
  membershipDate: z.coerce.date(),
  membershipEnd: z.coerce.date().nullable(),
  dateOfBirth: z.coerce.date().nullable(),
  zip: z.number().int({message: "Zipcode is required"}),
  useaMemberID: z.number().int().nullable(),
})

export type Member = z.infer<typeof MemberSchema>

/////////////////////////////////////////
// MEMBER PARTIAL SCHEMA
/////////////////////////////////////////

export const MemberPartialSchema = MemberSchema.partial()

export type MemberPartial = z.infer<typeof MemberPartialSchema>

/////////////////////////////////////////
// MEMBER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

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
  membershipDate: z.coerce.date().optional(),
}))

export type MemberOptionalDefaults = z.infer<typeof MemberOptionalDefaultsSchema>

/////////////////////////////////////////
// MEMBER RELATION SCHEMA
/////////////////////////////////////////

export type MemberRelations = {
  RiderCombo: RiderComboWithRelations[];
  Horse: HorseWithRelations[];
};

export type MemberWithRelations = z.infer<typeof MemberSchema> & MemberRelations

export const MemberWithRelationsSchema: z.ZodType<MemberWithRelations> = MemberSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema).array(),
  Horse: z.lazy(() => HorseWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// MEMBER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type MemberOptionalDefaultsRelations = {
  RiderCombo: RiderComboOptionalDefaultsWithRelations[];
  Horse: HorseOptionalDefaultsWithRelations[];
};

export type MemberOptionalDefaultsWithRelations = z.infer<typeof MemberOptionalDefaultsSchema> & MemberOptionalDefaultsRelations

export const MemberOptionalDefaultsWithRelationsSchema: z.ZodType<MemberOptionalDefaultsWithRelations> = MemberOptionalDefaultsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboOptionalDefaultsWithRelationsSchema).array(),
  Horse: z.lazy(() => HorseOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// MEMBER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type MemberPartialRelations = {
  RiderCombo?: RiderComboPartialWithRelations[];
  Horse?: HorsePartialWithRelations[];
};

export type MemberPartialWithRelations = z.infer<typeof MemberPartialSchema> & MemberPartialRelations

export const MemberPartialWithRelationsSchema: z.ZodType<MemberPartialWithRelations> = MemberPartialSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
  Horse: z.lazy(() => HorsePartialWithRelationsSchema).array(),
})).partial()

export type MemberOptionalDefaultsWithPartialRelations = z.infer<typeof MemberOptionalDefaultsSchema> & MemberPartialRelations

export const MemberOptionalDefaultsWithPartialRelationsSchema: z.ZodType<MemberOptionalDefaultsWithPartialRelations> = MemberOptionalDefaultsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
  Horse: z.lazy(() => HorsePartialWithRelationsSchema).array(),
}).partial())

export type MemberWithPartialRelations = z.infer<typeof MemberSchema> & MemberPartialRelations

export const MemberWithPartialRelationsSchema: z.ZodType<MemberWithPartialRelations> = MemberSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
  Horse: z.lazy(() => HorsePartialWithRelationsSchema).array(),
}).partial())

export default MemberSchema;
