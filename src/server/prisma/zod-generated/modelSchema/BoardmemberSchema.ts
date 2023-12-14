import { z } from 'zod';
import { PositionSchema } from '../inputTypeSchemas/PositionSchema'

/////////////////////////////////////////
// BOARDMEMBER SCHEMA
/////////////////////////////////////////

export const BoardmemberSchema = z.object({
  position: PositionSchema,
  name: z.string().nullable(),
  email: z.string().nullable(),
})

export type Boardmember = z.infer<typeof BoardmemberSchema>

/////////////////////////////////////////
// BOARDMEMBER PARTIAL SCHEMA
/////////////////////////////////////////

export const BoardmemberPartialSchema = BoardmemberSchema.partial()

export type BoardmemberPartial = z.infer<typeof BoardmemberPartialSchema>

/////////////////////////////////////////
// BOARDMEMBER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BoardmemberOptionalDefaultsSchema = BoardmemberSchema.merge(z.object({
}))

export type BoardmemberOptionalDefaults = z.infer<typeof BoardmemberOptionalDefaultsSchema>

export default BoardmemberSchema;
