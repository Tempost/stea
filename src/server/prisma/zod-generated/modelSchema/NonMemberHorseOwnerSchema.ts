import { z } from 'zod';
import { PhoneTypeSchema } from '../inputTypeSchemas/PhoneTypeSchema'
import { type HorseWithRelations, HorseWithRelationsSchema } from './HorseSchema'
import { type HorsePartialWithRelations, HorsePartialWithRelationsSchema } from './HorseSchema'

/////////////////////////////////////////
// NON MEMBER HORSE OWNER SCHEMA
/////////////////////////////////////////

export const NonMemberHorseOwnerSchema = z.object({
  phoneType: PhoneTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  fullName: z.string().trim(),
  email: z.string().trim().email({ message: "Invalid email address" }),
  phone: z.string().trim().min(1, { message: "Phone number is required" }),
})

export type NonMemberHorseOwner = z.infer<typeof NonMemberHorseOwnerSchema>

// NON MEMBER HORSE OWNER PARTIAL SCHEMA
//------------------------------------------------------

export const NonMemberHorseOwnerPartialSchema = NonMemberHorseOwnerSchema.partial()

export type NonMemberHorseOwnerPartial = z.infer<typeof NonMemberHorseOwnerPartialSchema>

// NON MEMBER HORSE OWNER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const NonMemberHorseOwnerOptionalDefaultsSchema = NonMemberHorseOwnerSchema.merge(z.object({
  phoneType: PhoneTypeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type NonMemberHorseOwnerOptionalDefaults = z.infer<typeof NonMemberHorseOwnerOptionalDefaultsSchema>

// NON MEMBER HORSE OWNER RELATION SCHEMA
//------------------------------------------------------

export type NonMemberHorseOwnerRelations = {
  horses: HorseWithRelations[];
};

export type NonMemberHorseOwnerWithRelations = z.infer<typeof NonMemberHorseOwnerSchema> & NonMemberHorseOwnerRelations

export const NonMemberHorseOwnerWithRelationsSchema: z.ZodType<NonMemberHorseOwnerWithRelations> = NonMemberHorseOwnerSchema.merge(z.object({
  horses: z.lazy(() => HorseWithRelationsSchema).array(),
}))

// NON MEMBER HORSE OWNER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type NonMemberHorseOwnerOptionalDefaultsWithRelations = z.infer<typeof NonMemberHorseOwnerOptionalDefaultsSchema> & NonMemberHorseOwnerRelations

export const NonMemberHorseOwnerOptionalDefaultsWithRelationsSchema: z.ZodType<NonMemberHorseOwnerOptionalDefaultsWithRelations> = NonMemberHorseOwnerOptionalDefaultsSchema.merge(z.object({
  horses: z.lazy(() => HorseWithRelationsSchema).array(),
}))

// NON MEMBER HORSE OWNER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type NonMemberHorseOwnerPartialRelations = {
  horses?: HorsePartialWithRelations[];
};

export type NonMemberHorseOwnerPartialWithRelations = z.infer<typeof NonMemberHorseOwnerPartialSchema> & NonMemberHorseOwnerPartialRelations

export const NonMemberHorseOwnerPartialWithRelationsSchema: z.ZodType<NonMemberHorseOwnerPartialWithRelations> = NonMemberHorseOwnerPartialSchema.merge(z.object({
  horses: z.lazy(() => HorsePartialWithRelationsSchema).array(),
})).partial()

export default NonMemberHorseOwnerSchema;
