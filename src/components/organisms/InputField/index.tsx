import React from 'react';
import * as S from './styles';
import { InputFieldProps } from './types';
import { useInputField } from './useInputField';
import { IconSvg } from '@components/atoms/IconSvg';
import { Icon } from '@assets/icons';

export const InputField = (props: InputFieldProps) => {
  const {
    label,
    required,
    value,
    onChangeText,
    placeholder,
    helperText,
    errorMessage,
    type = 'text',
    keyboardType,
    autoCapitalize,
    autoCorrect,
    multiline = false,
    numberOfLines = 1,
  } = props;

  const {
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
  } = useInputField(props);

  const showPasswordToggle = isPassword && !multiline;

  return (
    <S.Container>
      <S.LabelRow>
        <S.LabelText>{label}</S.LabelText>
        {required && <S.RequiredMark>*</S.RequiredMark>}
      </S.LabelRow>

      <S.InputWrapper
        status={currentStatus}
        isFocused={isFocused}
        multiline={multiline}
      >
        <S.StyledTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!isDisabled}
          status={currentStatus}
          secureTextEntry={secureTextEntry}
          keyboardType={
            keyboardType ?? (type === 'email' ? 'email-address' : 'default')
          }
          autoCapitalize={
            autoCapitalize ?? (type === 'email' ? 'none' : 'sentences')
          }
          autoCorrect={autoCorrect ?? type !== 'email'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#A0A0A0"
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
        />

        {showPasswordToggle && (
          <S.RightIconButton
            onPress={togglePasswordVisibility}
            disabled={isDisabled}
          >
            <IconSvg
              icon={isPasswordVisible ? Icon.openEyed : Icon.closeEyed}
              height={20}
              width={20}
            />
          </S.RightIconButton>
        )}
      </S.InputWrapper>

      {hasError && !!errorMessage ? (
        <S.ErrorRow>
          <S.ErrorText>{errorMessage}</S.ErrorText>
        </S.ErrorRow>
      ) : (
        helperText && <S.HelperText>{helperText}</S.HelperText>
      )}
    </S.Container>
  );
};
