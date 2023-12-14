import { z } from 'zod';

export const BoardmemberScalarFieldEnumSchema = z.enum(['name','email','position']);

export default BoardmemberScalarFieldEnumSchema;
