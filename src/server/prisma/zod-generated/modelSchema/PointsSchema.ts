import { z } from 'zod';
import type { RiderComboWithRelations } from './RiderComboSchema'
import type { RiderComboPartialWithRelations } from './RiderComboSchema'
import type { RiderComboOptionalDefaultsWithRelations } from './RiderComboSchema'
import type { ShowWithRelations } from './ShowSchema'
import type { ShowPartialWithRelations } from './ShowSchema'
import type { ShowOptionalDefaultsWithRelations } from './ShowSchema'
import { RiderComboWithRelationsSchema } from './RiderComboSchema'
import { RiderComboPartialWithRelationsSchema } from './RiderComboSchema'
import { RiderComboOptionalDefaultsWithRelationsSchema } from './RiderComboSchema'
import { ShowWithRelationsSchema } from './ShowSchema'
import { ShowPartialWithRelationsSchema } from './ShowSchema'
import { ShowOptionalDefaultsWithRelationsSchema } from './ShowSchema'

/////////////////////////////////////////
// POINTS SCHEMA
/////////////////////////////////////////

export const PointsSchema = z.object({
  uid: z.string().cuid(),
  riderUid: z.string().trim().min(1, { message: "Member Name is required" }),
  points: z.number(),
  place: z.string().trim(),
  showUid: z.string(),
})

export type Points = z.infer<typeof PointsSchema>

/////////////////////////////////////////
// POINTS PARTIAL SCHEMA
/////////////////////////////////////////

export const PointsPartialSchema = PointsSchema.partial()

export type PointsPartial = z.infer<typeof PointsPartialSchema>

/////////////////////////////////////////
// POINTS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const PointsOptionalDefaultsSchema = PointsSchema.merge(z.object({
  uid: z.string().cuid().optional(),
}))

export type PointsOptionalDefaults = z.infer<typeof PointsOptionalDefaultsSchema>

/////////////////////////////////////////
// POINTS RELATION SCHEMA
/////////////////////////////////////////

export type PointsRelations = {
  RiderCombo: RiderComboWithRelations;
  show: ShowWithRelations;
};

export type PointsWithRelations = z.infer<typeof PointsSchema> & PointsRelations

export const PointsWithRelationsSchema: z.ZodType<PointsWithRelations> = PointsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema),
  show: z.lazy(() => ShowWithRelationsSchema),
}))

/////////////////////////////////////////
// POINTS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type PointsOptionalDefaultsRelations = {
  RiderCombo: RiderComboOptionalDefaultsWithRelations;
  show: ShowOptionalDefaultsWithRelations;
};

export type PointsOptionalDefaultsWithRelations = z.infer<typeof PointsOptionalDefaultsSchema> & PointsOptionalDefaultsRelations

export const PointsOptionalDefaultsWithRelationsSchema: z.ZodType<PointsOptionalDefaultsWithRelations> = PointsOptionalDefaultsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboOptionalDefaultsWithRelationsSchema),
  show: z.lazy(() => ShowOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// POINTS PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type PointsPartialRelations = {
  RiderCombo?: RiderComboPartialWithRelations;
  show?: ShowPartialWithRelations;
};

export type PointsPartialWithRelations = z.infer<typeof PointsPartialSchema> & PointsPartialRelations

export const PointsPartialWithRelationsSchema: z.ZodType<PointsPartialWithRelations> = PointsPartialSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema),
  show: z.lazy(() => ShowPartialWithRelationsSchema),
})).partial()

export type PointsOptionalDefaultsWithPartialRelations = z.infer<typeof PointsOptionalDefaultsSchema> & PointsPartialRelations

export const PointsOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PointsOptionalDefaultsWithPartialRelations> = PointsOptionalDefaultsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema),
  show: z.lazy(() => ShowPartialWithRelationsSchema),
}).partial())

export type PointsWithPartialRelations = z.infer<typeof PointsSchema> & PointsPartialRelations

export const PointsWithPartialRelationsSchema: z.ZodType<PointsWithPartialRelations> = PointsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema),
  show: z.lazy(() => ShowPartialWithRelationsSchema),
}).partial())

export default PointsSchema;
