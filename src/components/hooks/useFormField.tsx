import { PropsWithChildren } from 'react';

export interface UseFormFieldProps extends PropsWithChildren {
  id?: string;
  name: string;
  label?: string;
  altLabel?: string;
  labelStyle?: string;
}

export const useFormField = <TFieldProps extends UseFormFieldProps>(
  props: TFieldProps,
) => {
  const { label, name, altLabel, labelStyle, ...otherProps } = props;
  let { id } = props;

  if (!id) {
    id = name;
  }

  return {
    formFieldProps: { id, name, label, labelStyle, altLabel },
    childProps: { ...otherProps, id, name },
  };
};
