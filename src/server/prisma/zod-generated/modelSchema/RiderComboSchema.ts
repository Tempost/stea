import { z } from 'zod';
import { DivisionSchema } from '../inputTypeSchemas/DivisionSchema'
import { type MemberWithRelations, MemberWithRelationsSchema } from './MemberSchema'
import { type HorseWithRelations, HorseWithRelationsSchema } from './HorseSchema'
import { type PointsWithRelations, PointsWithRelationsSchema } from './PointsSchema'
import { type ShowWithRelations, ShowWithRelationsSchema } from './ShowSchema'
import { type MemberPartialWithRelations, MemberPartialWithRelationsSchema } from './MemberSchema'
import { type HorsePartialWithRelations, HorsePartialWithRelationsSchema } from './HorseSchema'
import { type PointsPartialWithRelations, PointsPartialWithRelationsSchema } from './PointsSchema'
import { type ShowPartialWithRelations, ShowPartialWithRelationsSchema } from './ShowSchema'

/////////////////////////////////////////
// RIDER COMBO SCHEMA
/////////////////////////////////////////

export const RiderComboSchema = z.object({
  division: DivisionSchema,
  uid: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  totalPoints: z.number(),
  totalShows: z.number().int(),
  completedHT: z.boolean(),
  multiVenue: z.boolean(),
  memberName: z.string().trim().min(1, { message: "Member Name is required" }),
  horseName: z.string().trim().min(1, { message: "Horse Name is required" }),
})

export type RiderCombo = z.infer<typeof RiderComboSchema>

// RIDER COMBO PARTIAL SCHEMA
//------------------------------------------------------

export const RiderComboPartialSchema = RiderComboSchema.partial()

export type RiderComboPartial = z.infer<typeof RiderComboPartialSchema>

// RIDER COMBO OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RiderComboOptionalDefaultsSchema = RiderComboSchema.merge(z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  totalPoints: z.number().optional(),
  totalShows: z.number().int().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
}))

export type RiderComboOptionalDefaults = z.infer<typeof RiderComboOptionalDefaultsSchema>

// RIDER COMBO RELATION SCHEMA
//------------------------------------------------------

export type RiderComboRelations = {
  member: MemberWithRelations;
  horse: HorseWithRelations;
  points: PointsWithRelations[];
  shows: ShowWithRelations[];
};

export type RiderComboWithRelations = z.infer<typeof RiderComboSchema> & RiderComboRelations

export const RiderComboWithRelationsSchema: z.ZodType<RiderComboWithRelations> = RiderComboSchema.merge(z.object({
  member: z.lazy(() => MemberWithRelationsSchema),
  horse: z.lazy(() => HorseWithRelationsSchema),
  points: z.lazy(() => PointsWithRelationsSchema).array(),
  shows: z.lazy(() => ShowWithRelationsSchema).array(),
}))

// RIDER COMBO OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RiderComboOptionalDefaultsWithRelations = z.infer<typeof RiderComboOptionalDefaultsSchema> & RiderComboRelations

export const RiderComboOptionalDefaultsWithRelationsSchema: z.ZodType<RiderComboOptionalDefaultsWithRelations> = RiderComboOptionalDefaultsSchema.merge(z.object({
  member: z.lazy(() => MemberWithRelationsSchema),
  horse: z.lazy(() => HorseWithRelationsSchema),
  points: z.lazy(() => PointsWithRelationsSchema).array(),
  shows: z.lazy(() => ShowWithRelationsSchema).array(),
}))

// RIDER COMBO PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type RiderComboPartialRelations = {
  member?: MemberPartialWithRelations;
  horse?: HorsePartialWithRelations;
  points?: PointsPartialWithRelations[];
  shows?: ShowPartialWithRelations[];
};

export type RiderComboPartialWithRelations = z.infer<typeof RiderComboPartialSchema> & RiderComboPartialRelations

export const RiderComboPartialWithRelationsSchema: z.ZodType<RiderComboPartialWithRelations> = RiderComboPartialSchema.merge(z.object({
  member: z.lazy(() => MemberPartialWithRelationsSchema),
  horse: z.lazy(() => HorsePartialWithRelationsSchema),
  points: z.lazy(() => PointsPartialWithRelationsSchema).array(),
  shows: z.lazy(() => ShowPartialWithRelationsSchema).array(),
})).partial()

export default RiderComboSchema;
