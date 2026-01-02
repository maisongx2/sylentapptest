import { ReactNode } from 'react';
import { KeyboardTypeOptions, TextInputProps } from 'react-native';

export type InputFieldStatus = 'default' | 'error' | 'disabled';
export type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;

  placeholder?: string;
  helperText?: string;
  errorMessage?: string;

  status?: InputFieldStatus;
  required?: boolean;

  type?: 'text' | 'email' | 'password' | 'tel';

  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;

  passwordVisibleIcon?: ReactNode;
  passwordHiddenIcon?: ReactNode;

  disabled?: boolean;

  multiline?: boolean;
  numberOfLines?: number;
};
