// src/components/molecules/InputField/useInputField.ts
import { useCallback, useMemo, useState } from 'react';
import { InputFieldProps } from './types';

export const useInputField = (props: InputFieldProps) => {
  const { type = 'text', errorMessage, status = 'default', disabled } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const hasError = !!errorMessage || status === 'error';
  const isDisabled = disabled || status === 'disabled';

  const secureTextEntry = isPassword && !isPasswordVisible;

  const handleFocus = useCallback(() => {
    if (!isDisabled) setIsFocused(true);
  }, [isDisabled]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    if (!isDisabled && isPassword) {
      setIsPasswordVisible(prev => !prev);
    }
  }, [isDisabled, isPassword]);

  const currentStatus = useMemo<'default' | 'error' | 'disabled'>(() => {
    if (isDisabled) return 'disabled';
    if (hasError) return 'error';
    return 'default';
  }, [isDisabled, hasError]);

  return {
    isFocused,
    isPassword,
    isDisabled,
    hasError,
    secureTextEntry,
    isPasswordVisible,
    currentStatus,
    handleFocus,
    handleBlur,
    togglePasswordVisibility,
  };
};
