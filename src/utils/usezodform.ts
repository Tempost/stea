import { UseFormProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema, TypeOf } from 'zod';

/*
 * TSchema is the type of the zod schema for the form
 * This will be passed to the base UseFormProps type, omitting
 * the resolver field.
 */
export interface UseZodFormProps<TSchema extends ZodSchema>
  extends Exclude<UseFormProps<TypeOf<TSchema>>, 'resolver'> {
  schema: TSchema;
}

const useZodForm = <TSchema extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<TSchema>) =>
  useForm({ ...formProps, resolver: zodResolver(schema) });

export default useZodForm;
