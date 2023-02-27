import { z } from 'zod';
import { StatusSchema } from '../inputTypeSchemas/StatusSchema'
import { type NonMemberHorseOwnerWithRelations, NonMemberHorseOwnerWithRelationsSchema } from './NonMemberHorseOwnerSchema'
import { type MemberWithRelations, MemberWithRelationsSchema } from './MemberSchema'
import { type RiderComboWithRelations, RiderComboWithRelationsSchema } from './RiderComboSchema'
import { type NonMemberHorseOwnerPartialWithRelations, NonMemberHorseOwnerPartialWithRelationsSchema } from './NonMemberHorseOwnerSchema'
import { type MemberPartialWithRelations, MemberPartialWithRelationsSchema } from './MemberSchema'
import { type RiderComboPartialWithRelations, RiderComboPartialWithRelationsSchema } from './RiderComboSchema'

/////////////////////////////////////////
// HORSE SCHEMA
/////////////////////////////////////////

export const HorseSchema = z.object({
  regType: StatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  /**
   * Registered name of the horse, unique
   */
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  /**
   * Barn name of the horse
   */
  horseAKA: z.string().trim().nullable(),
  memberName: z.string().nullable(),
  registrationDate: z.coerce.date(),
  owner: z.string().nullable(),
})

export type Horse = z.infer<typeof HorseSchema>

// HORSE PARTIAL SCHEMA
//------------------------------------------------------

export const HorsePartialSchema = HorseSchema.partial()

export type HorsePartial = z.infer<typeof HorsePartialSchema>

// HORSE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const HorseOptionalDefaultsSchema = HorseSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  registrationDate: z.coerce.date().optional(),
}))

export type HorseOptionalDefaults = z.infer<typeof HorseOptionalDefaultsSchema>

// HORSE RELATION SCHEMA
//------------------------------------------------------

export type HorseRelations = {
  ownerRec?: NonMemberHorseOwnerWithRelations | null;
  memberOwner?: MemberWithRelations | null;
  RiderCombo: RiderComboWithRelations[];
};

export type HorseWithRelations = z.infer<typeof HorseSchema> & HorseRelations

export const HorseWithRelationsSchema: z.ZodType<HorseWithRelations> = HorseSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema).array(),
}))

// HORSE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type HorseOptionalDefaultsWithRelations = z.infer<typeof HorseOptionalDefaultsSchema> & HorseRelations

export const HorseOptionalDefaultsWithRelationsSchema: z.ZodType<HorseOptionalDefaultsWithRelations> = HorseOptionalDefaultsSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema).array(),
}))

// HORSE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type HorsePartialRelations = {
  ownerRec?: NonMemberHorseOwnerPartialWithRelations | null;
  memberOwner?: MemberPartialWithRelations | null;
  RiderCombo?: RiderComboPartialWithRelations[];
};

export type HorsePartialWithRelations = z.infer<typeof HorsePartialSchema> & HorsePartialRelations

export const HorsePartialWithRelationsSchema: z.ZodType<HorsePartialWithRelations> = HorsePartialSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerPartialWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberPartialWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
})).partial()

export default HorseSchema;
